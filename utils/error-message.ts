import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export const getErrorMessage = (error: unknown): string => {
  let message = "Something went wrong"

  if (error instanceof PrismaClientKnownRequestError) {
    const existingEmail = error.message.includes("Unique constraint failed on the fields: (`password`)")
    if (existingEmail) {
      message = "Email already exists"
      return message
    }
  }
  else {
    return message
  }
}