import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { EmailController } from "../emails/email";

const router = Router()

router.post('/cotization',
    body('name')
        .notEmpty().withMessage('Tu nombre es obligatorio'),
    body('phone')
        .notEmpty().withMessage('Tu numero de telefono es obligatorio'),
    body('email')
        .notEmpty().withMessage('Tu email es obligatorio'),
    body('message')
        .notEmpty().withMessage('Un mensaje es obligatorio'),
    handleInputErrors,
    EmailController.sendCotizationEmail
)

export default router