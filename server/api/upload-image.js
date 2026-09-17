import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '../utils/s3'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)

  const file = formData?.find(item => item.name === 'file')

  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File is required'
    })
  }

  const fileID = Date.now() + '.' + file.type.split('/')[1]

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileID,
      Body: file.data,
      ContentType: file.type
    })
  )

  return {
    success: true,
    key: fileID,
    url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileID}`
  }
})