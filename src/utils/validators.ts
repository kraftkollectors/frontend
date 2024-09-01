import { z } from "zod";

const validators = {
    email: z.string().email('invalid email address'),
    password: z.string()
    .min(6, 'password too short').max(25, 'password too long')
    .regex(/[A-Z]/, 'include an uppercase letter')
    .regex(/[a-z]/, 'include a lowercase letter')
    .regex(/[0-9]/, 'include a number')
    .regex(/[^A-Za-z0-9]/, 'include a special character'),
    name: z.string()
        .min(2, "must be 2 or more letters")
        .regex(/^[a-zA-Z\s._-]+$/, "invalid name format"),
    phoneNumber: z.string().min(10, "must be 10 or more digits")
    .regex(/^(?:\+88|01)?\d{11}$/, "invalid phone number"),
    url: z.string(),
    timeHour: z.string().min(4, 'invalid time'),
    nin: z.string()
    .min(11, 'must be 11 numbers')
    .max(11, 'must be 11 numbers')
    .regex(/^[0-9]+$/, 'must be numbers'),
};

export default validators;

