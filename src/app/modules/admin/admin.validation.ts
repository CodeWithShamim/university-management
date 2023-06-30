import { z } from 'zod';
import { BloodGroup, Gender } from '../user/user.constant';

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),

        lastName: z.string().optional(),

        middleName: z.string().optional(),
      })
      .optional(),

    gender: z.enum([...Gender] as [string, ...string[]]).optional(),

    dateOfBirth: z.string().optional(),

    email: z.string().email().optional(),

    contactNo: z.string().optional(),

    emergencyContactNo: z.string().optional(),

    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),

    presentAddress: z.string().optional(),

    permanentAddress: z.string().optional(),

    destination: z.string().optional(),

    managementDepartment: z.string().optional(),

    profileImage: z.string().optional(),
  }),
});

export const AdminValidation = {
  updateAdminZodSchema,
};
