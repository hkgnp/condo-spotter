const nodemailer = require('nodemailer');

const { HOST, USER, PASS } = process.env

const mailTransporter = nodemailer.createTransport({
    host: HOST,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: USER,
        pass: PASS,
    },
});

function sendMail(name, count) {
    const mailOptions = {
        from: 'benpng@u.nus.edu',
        to: 'ben@pngs.cc',
        subject: `[${name}]: Change in number of units`,
        text: `The current available number of available units are ${count}`
    };

    mailTransporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`${name} Email Seng: ${info.response}`)
        }
    });
}

module.exports = { sendMail }
