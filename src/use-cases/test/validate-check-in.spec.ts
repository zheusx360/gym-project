import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckinsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckinUseCase } from '../validate-check-in'
import { ResourceNotFoundError } from '../errors/resourse-not-found-error'
import { LateCheckInValidationError } from '../errors/late-checkin-validation-error'


let checkInsRepository: InMemoryCheckinsRepository
let sut: ValidateCheckinUseCase


//Testes no caso de uso das validações dos chekins
describe('Validate CheckIn use cases', () => {
   beforeEach(async () => {
      checkInsRepository = new InMemoryCheckinsRepository()
      sut = new ValidateCheckinUseCase(checkInsRepository)

      vi.useFakeTimers()
   })

   afterEach(() => {
      vi.useRealTimers()
   })

   // Deve ser possivel validar um chekin
   it('should be able to validate the Check-in', async () => {

      const createdCheckIn = await checkInsRepository.create({
         gym_id: 'gym-01',
         user_id: 'user-01'
      })

      console.log("gym: ", createdCheckIn)

      const { checkIn } = await sut.execute({
         checkinId: createdCheckIn.id
      })

      expect(checkIn.validate_at).toEqual(expect.any(Date))
      expect(checkInsRepository.items[0].validate_at).toEqual(expect.any(Date))
   })

   it('should not be able to validate an inexistent Check-in', async () => {

      expect(() => sut.execute({
         checkinId: 'inexistent-checkin-id',
      })).rejects.toBeInstanceOf(ResourceNotFoundError)

   })

   it('should not be able to validate the checkin after 20 minutes of its creation', async () => {
      vi.setSystemTime(new Date(2024, 11, 25, 13, 40))

      const createdCheckin = await checkInsRepository.create({
         gym_id: 'gym-01',
         user_id: 'user-01'
      })

      //Cria 21 minutos em miliseguntos para ser avançado pelo advanced do vite
      const twentyOneMinutesInseconds = 1000 * 60 * 21

      vi.advanceTimersByTime(twentyOneMinutesInseconds)


      await expect(() => sut.execute({
         checkinId: createdCheckin.id
      })).rejects.toBeInstanceOf(LateCheckInValidationError)

   })

})