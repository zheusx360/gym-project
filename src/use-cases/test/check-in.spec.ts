import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from '../check-in'
import { InmemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'


let usersRepository: InMemoryCheckinsRepository
let sut: CheckinUseCase
let gymsRepository: InmemoryGymsRepository

describe('CheckIn use cases', () => {
   beforeEach(() => {
      usersRepository = new InMemoryCheckinsRepository()
      gymsRepository = new InmemoryGymsRepository()
      sut = new CheckinUseCase(usersRepository, gymsRepository)

      vi.useFakeTimers()

      gymsRepository.items.push({
         id: 'gym-01',
         title: 'Academia de teste',
         description: '',
         phone: '985512345',
         latitude: new Decimal(0),
         longitude: new Decimal(0)
      })
   })

   afterEach(() => {
      vi.useRealTimers()
   })

   it('should be able to Check in', async () => {

      vi.setSystemTime(new Date(2024, 10, 11, 10, 0, 0))

      const { checkIn } = await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: 23.459512,
         userLongitude: -46.579712
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })
   it('should not be able to Check in twice in the same day', async () => {

      vi.setSystemTime(new Date(2024, 10, 11, 10, 0, 0))

      await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: 23.459512,
         userLongitude: -46.579712
      })

      await expect(() => sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: 23.459512,
         userLongitude: -46.579712
      })).rejects.toBeInstanceOf(Error)
   })

   it('should be able to Check in twice but in different days', async () => {

      vi.setSystemTime(new Date(2024, 10, 11, 10, 0, 0))

      await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: 23.459512,
         userLongitude: -46.579712
      })

      vi.setSystemTime(new Date(2024, 10, 12, 10, 0, 0))

      const { checkIn } = await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: 23.459512,
         userLongitude: -46.579712
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })

   it('should not be able to Check in on distance gym', async () => {

      vi.setSystemTime(new Date(2024, 10, 11, 10, 0, 0))

      const { checkIn } = await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: 23.459512,
         userLongitude: -46.579712
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })

})