const request = require('supertest')
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Register (e2e)', () => {
   beforeAll(async () => {
      await app.ready()
   })

   afterAll(async () => { })

   it('should be able to register', async () => {
      const response = await request(app.server).post('/users').send({
         name: 'Jonh doe',
         email: 'jondoe@email.com',
         password: '123123'
      })
      if (response.statusCode === 409) {
         console.log("----> ", response.error.text)
      }
      expect(response.statusCode).toEqual(201)
   })
})
