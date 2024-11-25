import { expect, describe, it, beforeEach } from 'vitest'
import { InmemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'
import { FetchNearByUseCase } from '../fetch-nearby-gyms'


let gymsRepository: InmemoryGymsRepository
let sut: FetchNearByUseCase


//Testes no caso de uso das academias
describe('CheckIn use cases', () => {
   beforeEach(async () => {
      gymsRepository = new InmemoryGymsRepository()
      sut = new FetchNearByUseCase(gymsRepository)
   })

   // Deve ser possivel obter a lista de academias em um raio de até 10km 
   it('should be able to fetch nearby gyms', async () => {

      await gymsRepository.create({
         title: 'Near Gym',
         description: 'Academia do JS',
         phone: '(11) 95685-5695',
         latitude: -23.4637899,
         longitude: -46.5063184,
      })

      await gymsRepository.create({
         title: 'Far Gym',
         description: 'Academia do JS',
         phone: '(11) 95685-5695',
         latitude: -23.4834329,
         longitude: -46.4380252,
      })


      const { gyms } = await sut.execute({
         userLatitude: -23.459512,
         userLongitude: -46.579712
      })

      console.log("Gyms: ", gyms)

      expect(gyms).toHaveLength(1)
      expect(gyms).toEqual([
         expect.objectContaining({ title: 'Near Gym' }),
      ])
   })
})