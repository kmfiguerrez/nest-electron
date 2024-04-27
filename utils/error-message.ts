import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export const getErrorMessage = (error: unknown): string => {
  let message = "Something went wrong"

  if (error instanceof PrismaClientKnownRequestError) {
    message = "Email already exists"
    return message
  }
  else {
    return message
  }
}