const nodemailer = require("nodemailer");

class NodeMailer {
  constructor(serviceType, authUser, authPass, to, subject, html) {
    this.serviceType = serviceType;
    this.authUser = authUser;
    this.authPass = authPass;
    this.to = to;
    this.subject = subject;
    this.html = html;
  }

  async sendEmail() {
    const transporter = nodemailer.createTransport({
      service: this.serviceType,
      auth: {
        user: this.authUser,
        pass: this.authPass,
      },
    });

    const mailOptions = {
      from: this.authUser,
      to: this.to,
      subject: this.subject,
      html: this.html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info.messageId);
      return info;
    } catch (error) {
      console.error("Error sending email: ", error.message);
    }
  }
}

module.exports = NodeMailer;
