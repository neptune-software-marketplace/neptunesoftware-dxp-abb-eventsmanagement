let selectedDeviceId;

const codeReader = new ZXing.BrowserMultiFormatReader()
console.log('ZXing code reader initialized')
codeReader.listVideoInputDevices()
  .then((videoInputDevices) => {
    selectedDeviceId = videoInputDevices[0].deviceId;

  })
  .catch((err) => {
    console.error(err)
  })


function startScan() {

  codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
    if (result) {
      //console result to see the output of the scan
      console.log(result);

      //To view only value of the scan

      console.log("Result text" + result.text);

      if (result.text) {

        var options = {
          parameters: {
            "where": JSON.stringify({ "ticketNumber": result.text }) // Optional 
          },
          data: {
            "checkin": "Yes"
          }
        };

        console.log(options);
        apioRestAPICheckIn(options);
        sap.m.MessageToast.show("You have sucessfully cheked-in for this event");

        stopScan();

        setTimeout(function () {
          //location.reload();
          //window.history.back();
          AppCache.Back();

        }, 250);


      } else {
        sap.m.MessageToast.show("Please scan a valid QR code");
        stopScan();
        //location.reload();

      }

      //Automatically closes the scanner once a result is captured
      //codeReader.reset()
    }
    if (err && !(err instanceof ZXing.NotFoundException)) {
      console.error(err)

    }
  })

}


function stopScan() {

  codeReader.reset();

}

//  Read further about different implementation procedure on github -https://github.com/zxing-js/library


function setProgress(text, percent) {
  oProgressIndicator.setPercentValue(percent);
  oProgressIndicator.setDisplayValue(percent + "% / 100%");
  oTextMessage.setText(text);
  if (percent === 100) {
    setTimeout(() => {
      oDialogProgress.close();
      oProgressIndicator.setPercentValue(0);
    }, 500)
  }
}