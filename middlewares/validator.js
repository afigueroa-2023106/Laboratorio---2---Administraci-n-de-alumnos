import { body } from "express-validator";
import { validateErrors, validateErrorsWithoutFile } from "./validated.errors.js";
import { existCourse, existEmail, existUsername } from "../utils/db.validator.js";

export const courseValidator=[
    body('name','Name cannot not be empty').notEmpty().toLowerCase().custom(existCourse),
    body('hour','Hour cannot not be empty').notEmpty(),
    validateErrors
]

export const UserValidator=[
    body('name',`Name can't not be empty`).notEmpty(),
    body('surname',`Surname can't not be empty`).notEmpty(),
    body('email',`Email can't not be empty`).notEmpty().isEmail().custom(existEmail),
    body('username',`Username can't not be empty`).notEmpty().toLowerCase().custom(existUsername),
    body('password',`Password can't not be empty`).notEmpty().isStrongPassword().withMessage('Password must be most strong').isLength({min:8}),
]