import { z } from 'zod'


export const profileFormSchema = z.object({
  first_name: z.string("please enter your first Name").min(3, "your fist name should be at least 3 character"),
  last_name: z.string("please enter your last Name").min(2, "your last name should be at least 2 character"),
  // username: z
  //   .string('Please enter your username.')
  //   .min(2, 'Username must be at least 2 characters.')
  //   .max(30, 'Username must not be longer than 30 characters.'),
  email: z.email({
    error: (iss) =>
      iss.input === undefined
        ? 'Please select an email to display.'
        : undefined,
  }),
  phone: z.string().optional(),
  // bio: z.string().max(160).min(4),
  // urls: z
  //   .array(
  //     z.object({
  //       value: z.url('Please enter a valid URL.'),
  //     })
  //   )
  //   .optional(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>