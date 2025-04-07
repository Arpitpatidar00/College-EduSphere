/* eslint-disable no-undef */
import sgMail from "@sendgrid/mail";

class EmailService {
  static instance = null;
  apiKey;

  constructor(apiKey) {
    this.apiKey = apiKey;
    sgMail.setApiKey(this.apiKey);
  }

  static getInstance(apiKey) {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService(apiKey);
    }
    return EmailService.instance;
  }

  async sendPlainTextEmail(to, subject, text) {
    const msg = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL || "noreply@example.com",
      subject,
      text,
    };

    await this.sendEmail(msg);
  }

  async sendHtmlEmail(to, subject, html) {
    const msg = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL || "noreply@example.com",
      subject,
      html,
    };

    await this.sendEmail(msg);
  }

  async sendEmailWithAttachments(to, subject, text, html, attachments) {
    const msg = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL || "noreply@example.com",
      subject,
      text,
      html,
      attachments: attachments?.map((attachment) => ({
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type,
        disposition: attachment.disposition,
      })),
    };

    await this.sendEmail(msg);
  }

  async sendTemplatedEmail(to, templateId, dynamicTemplateData) {
    const msg = {
      to,
      from: process.env.SENDGRID_SENDER_EMAIL || "arpittestemail007@gmail.com",
      templateId,
      dynamicTemplateData,
    };

    await this.sendEmail(msg);
  }

  async sendEmail(msg) {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error("Error sending email:", error.message);
      throw new Error("Failed to send email");
    }
  }
}

export default EmailService.getInstance(
  process.env.SENDGRID_API_KEY || "your_sendgrid_api_key"
);
