import { z } from 'zod'

export const signupSchema = z
  .object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    age: z.number().positive(),
  })
  .superRefine((args, ctx) => {
    if (args.password !== args.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPass'],
        message: 'password must be equal to confirm password',
      })
    }
  })
