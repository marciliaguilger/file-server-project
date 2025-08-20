import { Readable } from 'stream'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { Either, makeLeft, makeRight } from '@/shared/either'
import { InvalidFileFormatError } from './errors/invalid-file-format'

const uploadImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

const allowedMimeTypes = ['image/jpeg', 'image.jpg', 'image/png', 'image/webp']

type uploadImageInput = z.input<typeof uploadImageInput>
export async function uploadImage(
  input: uploadImageInput
): Promise<Either<InvalidFileFormatError, { url: string }>> {
  // Validate input
  const { contentStream, contentType, fileName } = uploadImageInput.parse(input)

  if (!allowedMimeTypes.includes(contentType)) {
    return makeLeft(new InvalidFileFormatError())
  }

  await db.insert(schema.uploads).values({
    name: fileName,
    remoteKey: fileName,
    remoteUrl: `https://example.com/uploads/${fileName}`,
  })

  return makeRight({ url: '' })
}
