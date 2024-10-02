import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
   NODE_ENV: z.enum(['dev', 'test', 'production']),
   PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

//Verifica se as variaveis de ambiente estão configuradas corretamente
if (_env.success === false) {
   console.log('⛔ -> Variaveis de ambiente não configuradas ➡️', _env.error.format())
   throw new Error('Invalid environment variable.')
}

export const env = _env.data