var logonScreen = {

    smtpVerified: false,
    isExternal: false,

    getLogonTypes: function () {

        var query = "";

        // From Browser
        if (location.pathname.toLowerCase().indexOf("/launchpad/") > -1) {
            var path = location.pathname.split("/");
            query = "?launchpad=" + path[path.length - 1];
        }

        $.ajax({
            type: "GET",
            url: "/user/logon/types" + query,
            success: function (data) {
                logonScreen.setSettings(data);
            },
            error: function (result, status) {}
        });
    },

    setSettings: function (data) {

        data.logonTypes.sort(sort_by("name", true));

        logonScreen.smtpVerified = data.showForgotPassword;

        // External Registration of Users 
        if (data.launchpadIsExternal) logonScreen.isExternal = true;

        // Logon Types
        var idps = [];

        // Add Other Login 
        $.each(data.logonTypes, function (i, item) {

            if (!item.show) return;

            switch (item.type) {
                case 'saml':
                case 'ldap':
                case 'azure-bearer':
                case 'oauth2':
                    logonScreen.addFormLogon(item);
                    break;
            }

        });

        // Set hide/show username/password
        logonScreen.setInputFields();

        // Launchpad Config 
        if (data.settingsLaunchpad && data.settingsLaunchpad.config) {
            if (data.settingsLaunchpad.config.loginTitle) txtLoginSubTitle1.setText(data.settingsLaunchpad.config.loginTitle);
            if (data.settingsLaunchpad.config.loginSubTitle) txtLoginSubTitle2.setText(data.settingsLaunchpad.config.loginSubTitle);
        }

        // Customizing
        if (data.customizing.length === 1) {

            // Background Color     
            setTimeout(function () {
                if (data.customizing[0].loginBackgroundColor) {
                    var style = document.createElement('style');
                    style.innerHTML = ".nepPanLogon { background-color: " + data.customizing[0].loginBackgroundColor + " !important}" + ".sapUiTheme-sap_fiori_3_dark .nepPanLogon { background-color: " +
                        data.customizing[0].loginBackgroundColor + " !important}" +
                        document.head.appendChild(style);
                }
            }, 200);

            // Texts 
            if (data.customizing[0].txtLogin1Enable) {
                linkLoginText1.setText(data.customizing[0].txtLogin1Label);
                linkLoginText1.setVisible(true);
                text1 = data.customizing[0].txtLogin1;
            }

            if (data.customizing[0].txtLogin2Enable) {
                text2 = data.customizing[0].txtLogin2;
            }

            if (data.customizing[0].txtLogin3Enable) {
                linkLoginText3.setText(data.customizing[0].txtLogin3Label);
                linkLoginText3.setVisible(true);
                linkLoginSep2.setVisible(true);
                text3 = data.customizing[0].txtLogin3;
            }
        }

        // Call Custom Settings 
        setSettingsCustom(data);

    },

    setInputFields: function () {

        var logonid = "local";
        localStorage.setItem('selectedLoginType', logonid);

        // Logon local
        if (logonid === "local") {
            inLoginName.setVisible(true);
            inLoginPassword.setVisible(true);
            if (logonScreen.smtpVerified && !isMobile) return;
        }

        // Logon others
        var logonType = ModelData.FindFirst(formLogons, "id", logonid);
        localStorage.setItem('p9logonData', JSON.stringify(logonType));

        switch (logonType.type) {

            case "azure-bearer":
                inLoginName.setVisible(false);
                inLoginPassword.setVisible(false);
                break;

            case "saml":
                inLoginName.setVisible(false);
                inLoginPassword.setVisible(false);
                break;

            case "oauth2":
                inLoginName.setVisible(false);
                inLoginPassword.setVisible(false);
                break;

            default:
                inLoginName.setVisible(true);
                inLoginPassword.setVisible(true);
                break;

        }
    },

    addFormLogon: function (data) {
        formLogons.push(data);
    },

    requestActivationCode: function (rec) {

        var url = "";
        if (isMobile) var url = AppCache.Url;

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: url + "/user/activation",
            data: JSON.stringify(rec),
            success: function (data) {
                jQuery.sap.require("sap.m.MessageToast");
                sap.m.MessageToast.show(data.status);
                boxSignUp.setVisible(false);
                boxLogon.removeStyleClass("nepSignUpLayout");
                formLogin.setVisible(true);
                inLoginName.setValue(modelformSignUp.oData.eMail);

            },
            error: function (result, status) {
                jQuery.sap.require("sap.m.MessageToast");
                sap.m.MessageToast.show(result.responseJSON.status);
            }
        });
    },

    forgotPassword: function () {
        logonScreen.requestActivationCode({
            username: inForgotUsername.getValue().toLowerCase(),
            type: "launchpad",
            launchpad: "portal"
        });

    },

    resetPassword: function () {

        if (inNewPassword.getValue() !== inNewPassword2.getValue()) {
            sap.m.MessageToast.show("Passwords doesn't match!");
        } else if (!inNewPassword.getValue()) {
            sap.m.MessageToast.show("Please provide a password");
        } else {
            oApp.setBusy(true);
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/user/forgot/reset",
                data: JSON.stringify({
                    token: location.href.split('token=')[1],
                    password: inNewPassword.getValue()
                }),
                success: function (data) {
                    oApp.setBusy(false);
                    sap.m.MessageToast.show("Password updated");

                    setTimeout(function () {
                        formNewPassord.setVisible(false);
                        formLogin.setVisible(true);

                        window.history.pushState({}, document.title, location.href.split('?token=')[0]);
                    }, 500);

                },
                error: function (result, status) {
                    oApp.setBusy(false);

                    jQuery.sap.require('sap.m.MessageBox');
                    sap.m.MessageBox.show(result.responseJSON.status, {
                        title: 'Error',
                        icon: 'ERROR',
                        actions: ['CLOSE'],
                        onClose: function () { }
                    });

                    inNewPassword.setValueState('Error');
                    inNewPassword2.setValueState('Error');
                }
            });
        }
    }
}