import { InternalServerErrorException } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendForgottenPasswordEmail = async (email, code) => {
  try {
    await transporter.sendMail({
      from: 'Rent X',
      to: email,
      subject: 'Reset password code',
      text: `Your code is: ${code}. This code will expire in 15 minutes.`,
    });
  } catch (err) {
    throw new InternalServerErrorException();
  }
};
