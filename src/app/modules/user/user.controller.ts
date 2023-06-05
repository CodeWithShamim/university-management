import { Request, Response } from 'express'
import { createUserToDB } from './user.service'

const createUser = async (req: Request, res: Response) => {
  const user = req.body

  try {
    const result = await createUserToDB(user)
    res.status(200).json({
      success: true,
      message: 'New user create success.',
      data: result,
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    })
  }
}

export default {
  createUser,
}
