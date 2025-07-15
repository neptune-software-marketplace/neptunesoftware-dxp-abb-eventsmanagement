var formLogons = [];
var text1 = "";
var text2 = "";
var text3 = "";

// Only TRUE when activation code requested
var inSignUp = false;

// Custom Login App - Mobile Client
var isMobile = false;
if (typeof AppCache !== "undefined" && AppCache.isMobile) isMobile = true;

// Add Function to AppCache object when inside Launchpad
if (isMobile) AppCache.loginAppSetSettings = logonScreen.setSettings;

// Forgot Password
var token = location.href.split('token=')[1];

if (token) {
    formLogin.setVisible(false);
    formForgot.setVisible(false);
    formNewPassord.setVisible(true);
}

// Startup
if (!isMobile) {
    localStorage.removeItem("p9azureToken");
    setTimeout(function () {
        logonScreen.getLogonTypes();
    }, 10);
}
textAreaGDPR1.setHtmlText("<p>Yes, I agree with Neptune Software's terms and privacy policy. We garantee 100% privacy. You can opt-out at any time.</p>")
textAreaGDPR2.setHtmlText("<p>By Providing your contact information and clicking 'Register', you are authorizing Neptune Software to store your contact details and contact you via email with information about Neptune Software products, events, and other relevant product updates.</p><p>Your privacy is very important to us and you can opt-out at any time.</p>");

// Phone 
setTimeout(function () {

    if (sap.ui.Device.system.phone) {
        // flexLogon.setHeight("100%");
        // flexLogon.setWidth("100%");
        // flexLogon.addStyleClass("nepFlexPhone");
        panLogonLocal.setWidth("100%");
        panLogonLocal.setHeight("100%");
        panLogonLocal.removeStyleClass("nepPanLogonBorder");
        // layoutLogon.setSize("100%");
    }

    modelinformSignUpindustry.setSizeLimit(5000);
    modelinformSignUpcountry.setSizeLimit(5000);

    modelinformSignUpindustry.setData(industries);
    modelinformSignUpcountry.setData(countries);

}, 100);

// Sorter Function
var sort_by = function (field, reverse, primer) {
    var key = primer ?
        function (x) {
            return primer(x[field])
        } :
        function (x) {
            return x[field]
        };
    reverse = !reverse ? 1 : -1;
    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

sap.ui.getCore().attachInit(function (data) {
//Example URL
//https://portal-dev.neptune-software.com/launchpad/portal?utm_source=Website&utm_medium=DX%20Platform&utm_campaign=Free%20Trial&utm_term=CTA%201&utm_content=Top    

    var str = location.href;
    var res = str.split(".neptune-software.com/launchpad/portal?");
    try {
        var utmarray = res[1].split("&");

        for (i = 0; i < utmarray.length; i++) {
            var values = utmarray[i].split("=");
            var utm_name = values[0].toLowerCase();
            var utm_value = values[1].replace("%20", " ");
            var utm_value = utm_value.replace("#","");

            modeloModelUTMs.oData[utm_name] = utm_value;
            setCacheoModelUTMs();
        }
    } catch (err) {
        console.log("No UTMs / Free Trial Parameter detected...");
    }
    console.log(modeloModelUTMs.oData);

    const doUTNsExist = modeloModelUTMs.getData();
    setTimeout(function() {
        if (Object.keys(doUTNsExist).length > 0) {
            formLogin.setVisible(true);
            boxSignUp.setVisible(false);
            boxLogon.removeStyleClass("nepSignUpLayout");
        }
    }, 200);

});
