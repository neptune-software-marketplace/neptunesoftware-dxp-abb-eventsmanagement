function gencatcha() {
    var alpha = new Array("A", "B", "C", "D", "E", "F", "G", "H", "J",
        "K", "M", "N", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d",
        "e", "f", "g", "h", "j", "k", "m", "n",
        "p", "q", "r", "s", "t", "u", "v", "w", "x",
        "y", "z");
    var i;
    for (i = 0; i < 6; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = Math.ceil(Math.random() * 10) + "";
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = Math.ceil(Math.random() * 10) + "";
        var f = alpha[Math.floor(Math.random() * alpha.length)];
        var g = alpha[Math.floor(Math.random() * alpha.length)];
    }
    var code = a + " " + b + " " + " " + c + " " + d + " " + e + " " + f + " " + g;
    var bCode = code.split(" ").join("");
    return bCode;
};

function onValidate() {
    var Input1 = generatecaptcha_d.getText();
    var Input2 = generatecaptcha_i.getValue();
    if (Input2 === "") {
        sap.m.MessageToast.show("Please enter the captcha");
    }
    else if (Input1 === Input2) {
         sap.m.MessageToast.show("Validation is Correct");
        generatecaptcha_i.setValue("");
        catcha_i.setVisible(false);
        catcha_d.setVisible(false);
        butSubmitForgot.setEnabled(true);
    }
    else {
        sap.m.MessageToast.show("Validation is wrong");
        generatecaptcha_i.setValue("");
        butSubmitForgot.setEnabled(false);
    }
};