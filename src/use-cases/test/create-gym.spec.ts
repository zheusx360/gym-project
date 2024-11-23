import { InmemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "../create-gym";
import { beforeEach, describe, expect, it } from "vitest";


let gymRepository: InmemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym use case', () => {

   beforeEach(() => {
      gymRepository = new InmemoryGymsRepository()
      sut = new CreateGymUseCase(gymRepository)
   })

   it('should be able to create to gym', async () => {
      const { gym } = await sut.execute({
         title: 'GymJS',
         description: 'Academia do JS',
         phone: '(11) 95685-5695',
         latitude: -23.459512,
         longitude: -46.579712,
      })

      console.log("Gym: ", gym)
      expect(gym.id).toEqual(expect.any(String))
   })

})