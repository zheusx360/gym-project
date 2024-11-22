import { Gym } from "@prisma/client";
import { GymsRepositoryInterface } from "../gyms-repositorys-interface";

export class InmemoryGymsRepository implements GymsRepositoryInterface {

   public items: Gym[] = []

   async findById(id: string) {
      const gym = this.items.find(item => item.id === id)

      if (!gym) {
         return null
      }

      return gym
   }


}