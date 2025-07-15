log.info(req.body)


const emailValues = {

    name: req.body.firstName,
    surname: req.body.lastName,
    email: req.body.recieverEmail,
    event: req.body.event,
    qrcode: req.body.qrcode
}


await sendEmail(req.body.recieverEmail, "Ticket information", null, 'support@neptune-software.com', '43F64821-306F-ED11-AC20-0050F279CDEF', emailValues);

log.info(emailValues);

complete();