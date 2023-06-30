import mongoose, { Schema } from 'mongoose';
import { BloodGroup, Gender } from '../user/user.constant';
import { IAdmin, IAdminModel } from './admin.interface';

const adminSchema = new Schema<IAdmin, IAdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: String,
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    gender: {
      type: String,
      enum: Gender,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: BloodGroup,
    },

    destination: {
      type: String,
      required: true,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'ManagementDepartment',
    },
    profileImage: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Admin = mongoose.model<IAdmin, IAdminModel>('Admin', adminSchema);

export default Admin;
