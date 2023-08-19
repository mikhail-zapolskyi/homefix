import { emailHtml } from "@/components/emails/email";
import nodemailer from "nodemailer";
import Password from "./bcrypt";
import prisma from "@/prisma/client";

const sendEmail = async (email: string, emailType: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return "user not found";
        }
        const userId = user.id;
        const hashedToken = Password.hash(userId.toString());
        const verifyUrl = `${process.env.DOMAIN}auth/verify-email?token=${hashedToken}`;
        const resetUrl = `${process.env.DOMAIN}auth/reset-password?token=${hashedToken}`;

        const url = emailType === "verify" ? verifyUrl : resetUrl;
        const urlText =
            emailType === "verify"
                ? "Click here to verify email"
                : "Click here to reset password";

        if (emailType === "verify") {
            const data = {
                verifyToken: hashedToken,
                verifyTokenExpiry: new Date(Date.now() + 3600000),
            };

            await prisma.user.update({
                where: { id: userId },
                data,
            });
        } else if (emailType === "reset") {
            const data = {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
            };

            await prisma.user.update({
                where: { id: userId },
                data,
            });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD,
            },
        });

        const options = {
            from: process.env.SENDER_EMAIL,
            to: email.toString(),
            subject:
                emailType === "verify"
                    ? "Verify your email"
                    : "Reset your password",
            html: emailHtml(url, urlText),
        };

        await transporter.sendMail(options);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export default sendEmail;
