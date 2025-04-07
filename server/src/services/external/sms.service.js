/* eslint-disable no-undef */
import twilio from "twilio";

class SmsService {
  static instance = null;
  client;
  sender;

  constructor(accountSid, authToken, sender) {
    this.client = twilio(accountSid, authToken);
    this.sender = sender;
  }

  static getInstance(accountSid, authToken, sender) {
    if (!SmsService.instance) {
      SmsService.instance = new SmsService(accountSid, authToken, sender);
    }
    return SmsService.instance;
  }

  async sendTextMessage(to, body) {
    try {
      await this.client.messages.create({
        body,
        from: this.sender,
        to,
      });
    } catch (error) {
      console.error(`Failed to send SMS to ${to}:`, error.message);
      throw new Error("Failed to send SMS");
    }
  }

  async sendTemplatedMessage(to, template, dynamicData) {
    const messageBody = this.interpolateTemplate(template, dynamicData);
    await this.sendTextMessage(to, messageBody);
  }

  interpolateTemplate(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      const value = data[key];
      return value !== undefined ? String(value) : "";
    });
  }
}

export default SmsService.getInstance(
  process.env.TWILIO_ACCOUNT_SID || "AC_ur_account_sid",
  process.env.TWILIO_AUTH_TOKEN || "your_auth_token",
  process.env.TWILIO_PHONE_NUMBER || "your_twilio_phone_number"
);
