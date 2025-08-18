import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export const uploadImageRoute: FastifyPluginAsyncZod = async (
  server: FastifyInstance
) => {
  server.post(
    '/uploads',
    {
      schema: {
        summary: 'Upload an image',
        body: z.object({
          name: z.string(),
          password: z.string().optional(),
        }),
        response: {
          201: z.object({ uploadId: z.string() }),
          409: z
            .object({ message: z.string() })
            .describe('Upload already exists'),
        },
      },
    },
    async (request, reply) => {
      await db.insert(schema.uploads).values({
        name: 'name',
        remoteKey: 'remoteKey',
        remoteUrl: 'remoteUrl',
      })

      return reply.status(201).send({ uploadId: 'teste' })
    }
  )
}
