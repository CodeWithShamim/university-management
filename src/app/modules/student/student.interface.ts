export type IStudent = {
  name: {
    firstName: string
    middleName?: string
    lastName: string
  }
  gender: string
  dateOfBirth: Date
  guardian: string
  contactNo: string
  emergencyContactNo: string
  email: string
  presentAddress: string
  permanentAddress: string
  department: string
  subject: string
}
