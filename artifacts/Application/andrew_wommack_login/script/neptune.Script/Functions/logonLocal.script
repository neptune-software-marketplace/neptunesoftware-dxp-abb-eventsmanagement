function logonLocal(rec) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/user/logon/local",
        data: JSON.stringify(rec),
        success: function (data) {


            
                location.reload();
        },
        error: function (result, status) {
            if (result.status === 401) {
                inLoginName.setValueState("Error");
                inLoginPassword.setValueState("Error");
                sap.m.MessageToast.show(txtWrongUsernamePassword.getText());
            } else {
                if (result.responseJSON) {
                    sap.m.MessageToast.show(result.status + ": " + result.responseJSON.status);
                } else {
                    sap.m.MessageToast.show(result.status + ": " + result.statusText);
                }
            }
        }
    });
}
