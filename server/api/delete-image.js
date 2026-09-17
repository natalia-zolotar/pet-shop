import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '../utils/s3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.key) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Image key is required'
    })
  }

  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: body.key
    })
  )

  return {
    success: true
  }
})