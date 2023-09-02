const twilio = require("twilio");

const accountSid = "AC1c166c7d1c0d1f7cb9e3344e433a7cbd";
const authToken = "0422c2fd63448abe7c3c407ab031c05c";
const client = twilio(accountSid, authToken);

async function registerPhoneNumbers(phoneNumber) {
  client.incomingPhoneNumbers
    .create({
      phoneNumber: phoneNumber,
    })
    .then((incoming_phone_number) =>
      console.log("registered", incoming_phone_number.sid)
    )
    .catch((err) => {});
}

const sendSMS = async (phoneNumber, message) => {
  try {
    await client.messages.create({
      body: message,
      from: "+15673716017",
      to: phoneNumber,
    });
    console.log(`SMS sent to ${phoneNumber}`);
  } catch (error) {
    console.error(error);
  }
};

// controllers/sms.js

const sendSMSToStudent = async (req, res) => {
  const { phoneNumber, message } = req.body;
  await registerPhoneNumbers(phoneNumber);
  await sendSMS(phoneNumber, message);
  res.status(200).send({ status: "success", objects: "SMS sent", err: null });
};

module.exports = { sendSMSToStudent };
