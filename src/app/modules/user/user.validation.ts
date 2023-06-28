import { z } from 'zod';
import { BloodGroup, Gender, UserRole } from './user.constant';

const createStudentZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    role: z.enum([...UserRole] as [string, ...string[]]).optional(),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string({
          required_error: 'Middle name is required',
        }),
      }),
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      parmanentAddress: z.string({
        required_error: 'Parmanent address is required',
      }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),

      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required',
        }),
        motherName: z.string({
          required_error: 'Mother name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required',
        }),
        address: z.string({
          required_error: 'Guardian address is required',
        }),
      }),

      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact number is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),

      profileImage: z.string().optional(),
    }),
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    role: z.enum([...UserRole] as [string, ...string[]]).optional(),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string({
          required_error: 'Middle name is required',
        }),
      }),
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      parmanentAddress: z.string({
        required_error: 'Parmanent address is required',
      }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      destination: z.string({
        required_error: 'Destination is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),

      profileImage: z.string().optional(),
    }),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    role: z.enum([...UserRole] as [string, ...string[]]).optional(),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string({
          required_error: 'Middle name is required',
        }),
      }),
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      parmanentAddress: z.string({
        required_error: 'Parmanent address is required',
      }),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      destination: z.string({
        required_error: 'Destination is required',
      }),
      managementDepartment: z.string({
        required_error: 'Management department is required',
      }),

      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
