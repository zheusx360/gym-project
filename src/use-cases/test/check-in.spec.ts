import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from '../check-in'
import { InmemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckinsError } from '../errors/max-number-of-checkins-error'


let usersRepository: InMemoryCheckinsRepository
let sut: CheckinUseCase
let gymsRepository: InmemoryGymsRepository


//Testes no caso de uso dos chekins
describe('CheckIn use cases', () => {
   beforeEach(async () => {
      usersRepository = new InMemoryCheckinsRepository()
      gymsRepository = new InmemoryGymsRepository()
      sut = new CheckinUseCase(usersRepository, gymsRepository)

      vi.useFakeTimers()

      await gymsRepository.create({
         id: 'gym-01',
         title: 'Academia de teste',
         description: '',
         phone: '985512345',
         latitude: -23.459512,
         longitude: -46.579712
      })
   })

   afterEach(() => {
      vi.useRealTimers()
   })

   // Deve ser possivel fazer um chekin
   it('should be able to Check in', async () => {

      vi.setSystemTime(new Date(2024, 10, 11, 10, 0, 0))

      const { checkIn } = await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: -23.459512,
         userLongitude: -46.579712
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })

   //Não deve ser possivel fazer dois checkins no mesmo dia 
   it('should not be able to Check in twice in the same day', async () => {

      vi.setSystemTime(new Date(2024, 10, 11, 10, 0, 0))

      await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: -23.459512,
         userLongitude: -46.579712
      })

      await expect(() => sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: -23.459512,
         userLongitude: -46.579712
      })).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
   })

   //Deve ser possivel fazer dois checkis mas em dias diferentes
   it('should be able to Check in twice but in different days', async () => {

      vi.setSystemTime(new Date(2024, 10, 11, 10, 0, 0))

      await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: -23.459512,
         userLongitude: -46.579712
      })

      vi.setSystemTime(new Date(2024, 10, 12, 10, 0, 0))

      const { checkIn } = await sut.execute({
         gymId: 'gym-01',
         userId: 'user-01',
         userLatitude: -23.459512,
         userLongitude: -46.579712
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })

   //Não deve ser possivel fazer checkin a mais de 100 metros da academia
   it('should not be able to Check in on distance gym', async () => {

      vi.setSystemTime(new Date(2024, 10, 11, 10, 0, 0))

      gymsRepository.items.push({
         id: 'gym-02',
         title: 'Academia de teste',
         description: '',
         phone: '985512345',
         latitude: new Decimal(-23.4105159),
         longitude: new Decimal(-46.4846712)
      })


      await expect(() =>
         sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -23.459512,
            userLongitude: -46.579712
         })
      ).rejects.toBeInstanceOf(MaxDistanceError)
   })
})