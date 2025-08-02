import type { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

type EmailType = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

dotenv.config();

export const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export class EmailController {
  static sendCotizationEmail = async (req: Request, res: Response) => {
    const { name, phone, email, message } = req.body;

    try {
      await transport.sendMail({
        from: "Nucleo Studio <josh.araya.developer@gmail.com>",
        to: "josharaya226@gmail.com",
        subject: "Nucleo Studio - Cotizacion",
        text: "Nucleo Studio - Cotizacion",
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); color: #333;">
            <h2 style="text-align: center; color: #4A90E2; margin-bottom: 24px;">📋 Información del Cliente</h2>
            
            <table style="width: 100%; font-size: 16px; line-height: 1.6;">
                <tr>
                <td style="font-weight: bold; width: 120px;">Nombre:</td>
                <td>${name}</td>
                </tr>
                <tr>
                <td style="font-weight: bold;">Número:</td>
                <td>${phone}</td>
                </tr>
                <tr>
                <td style="font-weight: bold;">Email:</td>
                <td>${email}</td>
                </tr>
                <tr>
                <td style="font-weight: bold;">Mensaje:</td>
                <td style="white-space: pre-wrap;">${message}</td>
                </tr>
            </table>

            <p style="margin-top: 30px; font-size: 14px; color: #888; text-align: center;">
                Nucleo Studio &mdash; Este mensaje fue generado automáticamente.
            </p>
            </div>
        `,
      });

      res.send('Email Enviado Correctamente')
    } catch (error) {
      res.status(500).json({ error: "There was an error" });
      console.log(error);
    }
  };
}
