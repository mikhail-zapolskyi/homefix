import { emailHtml } from "@/components/emails/email";
import nodemailer from "nodemailer";
import Password from "./bcrypt";
import prisma from "@/prisma/client";

const sendEmail = async (email: string, emailType: string, userId: string) => {
    try {
        const hashedToken = Password.hash(userId.toString());
        const url = `${process.env.DOMAIN}verify-email?token=${hashedToken}`;

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
            html: emailHtml(url),
        };

        await transporter.sendMail(options);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export default sendEmail;
