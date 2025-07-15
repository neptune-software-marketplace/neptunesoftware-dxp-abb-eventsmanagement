function submitTicket() {

    // let getValcomponents = [inputName];
    let getValcomponents = [oComboBox, oInputFirstName, oInputLastName, oInputStreet, oInputCity, oInputState,
        oInputPostcode, oInputPhoneNumber, oComboBoxPartner, oInputEmail, oInputFirstName1, oInputLastName1, oInputEmail1];
    getValcomponents.forEach(component => component.setValueState("None"));

    // **** VALIDATION SECTION ******
    // Use "Return" to get out of the script
    if (oComboBox.getValue() === "") {
        oComboBox.setValueState("Error")
        sap.m.MessageToast.show("Please provide a ticket holder");
        return
    };

    if (oInputFirstName.getValue() === "") {
        oInputFirstName.setValueState("Error")
        sap.m.MessageToast.show("Please provide a first name");
        return
    };

    if (oInputLastName.getValue() === "") {
        oInputLastName.setValueState("Error")
        sap.m.MessageToast.show("Please provide a last name");
        return
    };

    if (oInputStreet.getValue() === "") {
        oInputStreet.setValueState("Error")
        sap.m.MessageToast.show("Please provide a street");
        return
    };


    if (oInputCity.getValue() === "") {
        oInputCity.setValueState("Error")
        sap.m.MessageToast.show("Please provide a city");
        return
    };


    if (oInputState.getValue() === "") {
        oInputState.setValueState("Error")
        sap.m.MessageToast.show("Please provide a state/region");
        return
    };

    if (oInputPostcode.getValue() === "") {
        oInputPostcode.setValueState("Error")
        sap.m.MessageToast.show("Please provide a postcode");
        return
    };

    if (oInputPhoneNumber.getValue() === "") {
        oInputPhoneNumber.setValueState("Error")
        sap.m.MessageToast.show("Please provide a phone number");
        return
    };

    if (oInputEmail.getValue() === "") {
        oInputEmail.setValueState("Error")
        sap.m.MessageToast.show("Please provide an email address");
        return
    };


    if (oInputFirstName1.getValue() === "") {
        oInputFirstName1.setValueState("Error")
        sap.m.MessageToast.show("Please provide a name");
        return
    };

    if (oInputLastName1.getValue() === "") {
        oInputLastName1.setValueState("Error")
        sap.m.MessageToast.show("Please provide a last name");
        return
    };

    if (oInputEmail1.getValue() === "") {
        oInputEmail1.setValueState("Error")
        sap.m.MessageToast.show("Please provide an email address");
        return
    };

    if (oComboBoxPartner.getValue() === "") {
        oComboBoxPartner.setValueState("Error")
        sap.m.MessageToast.show("Are you a partner?");
        return
    };

    // Randomly generate a serial number for a new ticket
    var serialNum = Math.floor((Math.random() * 10000) + 1);
    let ticket = "TN" + serialNum;
    console.log(ticket);

    var qrcode = new QRCode("qrcode1", {
        text: ticket,
        width: 228,
        height: 228,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    console.log(qrcode);
    // Convert QR code to base64
    var img = qrcode._oDrawing._elCanvas.toDataURL("image/png");

    console.log(img);


    // Create the empty Object
    let final_data = {}


    // Add attributes to the Object, based on the inputs
    final_data.firstName = oInputFirstName.getValue();
    final_data.lastName = oInputLastName.getValue();
    final_data.ticketType = oComboBox.getValue();
    final_data.street = oInputStreet.getValue();
    final_data.city = oInputCity.getValue();
    final_data.stateRegion = oInputState.getValue();
    final_data.postcode = oInputPostcode.getValue();
    final_data.phoneNumber = oInputPhoneNumber.getValue();
    final_data.email = oInputEmail.getValue();
    final_data.recieverName = oInputFirstName1.getValue();
    final_data.recieverLastName = oInputLastName1.getValue();
    final_data.recieverEmail = oInputEmail1.getValue();
    final_data.event = oTextEventTitle.getText();
    final_data.partner = oComboBoxPartner.getValue();
    final_data.checkin = "No";
    final_data.ticketNumber = ticket;
    final_data.qrcode = img;



    // Log the Object
    console.log(final_data);

    // Assign the data object to "Options"
    var options = { data: final_data };

    // Trigger the API and pass the "Options"
    apipostTicket(options);

    //apioRestAPITriggerEmailScript(options);
    apisendEmail(options);

    // Message toast 
    sap.m.MessageToast.show("Ticket successfully submitted!");



}

//-----------------------------------------------------------------------//

// Clear form function

function clearForm() {

    // Assign input fields to a variable 
    let getValcomponents = [oComboBox, oInputFirstName, oInputLastName, oInputStreet, oInputCity, oComboBoxPartner, oInputConfirmEmail, oInputState,
        oInputPostcode, oInputPhoneNumber, oInputEmail, oInputFirstName1, oInputLastName1, oInputEmail1];

    // Arrow function:
    getValcomponents.forEach(component => component.setValue(""));

}

