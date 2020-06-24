import nodemailer from 'nodemailer';

export default (emailTo, confirmCode) =>
  new Promise(async (resolve, reject) => {
    const emailTransfer = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_MAIL_PW,
      },
    });

    const emailInfo = {
      from: process.env.SENDER_MAIL,
      to: emailTo,
      subject: 'Verify your e-mail address! (NoteAppp)',
      text: `Here is your confirm code: ${confirmCode}`,
    };

    try {
      await emailTransfer.sendMail(emailInfo);
      return resolve('success');
    } catch (err) {
      return reject(err);
    }
  });