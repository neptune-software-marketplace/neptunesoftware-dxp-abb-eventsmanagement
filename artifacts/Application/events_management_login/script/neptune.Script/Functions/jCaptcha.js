// // optionally, set maximum number of captcha validation on event:
// const maxNumberOfTries = 5;

// // captcha initial setup
// var myCaptcha = new jCaptcha({
//     el: '.jCaptcha',
//     canvasClass: 'jCaptchaCanvas',
//     canvasStyle: {
//         // properties for captcha stylings
//         width: 100,
//         height: 20,
//         textBaseline: 'top',
//         font: 'Bold 20px Arial',
//         textAlign: 'left',
//         fillStyle: '#000',
//     },

//     // set callback function
//     callback: function (response, $captchaInputElement, numberOfTries) {

//         if (maxNumberOfTries === numberOfTries) {
//             // maximum attempts reached, so do something
//             // e.g. disable the form:
//             document.querySelector('form').removeEventListener('submit', formSubmit);
//             $captchaInputElement.classList.add('disabled');
//             $captchaInputElement.placeholder = 'Maximum attempts reached!';
//             $captchaInputElement.setAttribute('disabled', 'true');
//             // document.querySelector('button').setAttribute('disabled', 'true');

//             return;
//         }

//         if (response == 'success') {

//             $captchaInputElement.classList.remove('error');
//             $captchaInputElement.classList.add('success');
//             $captchaInputElement.placeholder = 'Submit successful!';

//             msgCaptcha.setText("Captcha Verified");
//             msgCaptcha.setType("Success");
//             msgCaptcha.setVisible(true)
            
//             catcha_d.setVisible(false);
//             butSubmitForgot.setEnabled(true);

//         }

//         if (response == 'error') {
//             $captchaInputElement.classList.remove('success');
//             $captchaInputElement.classList.add('error');
//             $captchaInputElement.placeholder = 'Captcha Response Wrong!!';

//             msgCaptcha.setVisible(true);
//             msgCaptcha.setText("Invalid Captcha String");
//             msgCaptcha.setType("Error");
//             butSubmitForgot.setEnabled(false);

//         }

//     }

// });