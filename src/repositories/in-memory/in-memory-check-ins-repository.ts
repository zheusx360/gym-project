import { CheckIn, Prisma } from "@prisma/client";

import { CheckinRepositoryInterface } from "../check-ins-repository-interfaces";
import { randomUUID } from "crypto";
import dayjs = require("dayjs");

export class InMemoryCheckinsRepository implements CheckinRepositoryInterface {
   async save(checkIn: CheckIn) {
      const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

      if (checkInIndex >= 0) {
         this.items[checkInIndex] = checkIn
      }

      return checkIn
   }

   async findById(checkinId: string) {
      const checkin = this.items.find((item) => item.id === checkinId)

      if (!checkin) {
         null
      }

      return checkin
   }
   async counterByUserId(userId: string) {
      return this.items.filter((item) => item.user_id === userId).length
   }
   async findManyByUserId(userId: string, page: number) {
      return this.items.filter(items => items.user_id === userId).slice((page - 1) * 20, page * 20)
   }

   async findByUserIdOnDate(userId: string, date: Date) {

      const startOfTheDay = dayjs(date).startOf('date')
      const endtOfTheDay = dayjs(date).endOf('date')

      const checkInOnSameDate = this.items.find((chekIn) => {
         const checkInDate = dayjs(chekIn.created_at)
         const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endtOfTheDay)

         return chekIn.user_id === userId && isOnSameDate
      })

      if (!checkInOnSameDate) {
         return null
      }

      return checkInOnSameDate
   }

   public items: CheckIn[] = []

   async create(data: Prisma.CheckInUncheckedCreateInput) {
      const checkIn = {
         id: randomUUID(),
         user_id: data.user_id,
         gym_id: data.gym_id,
         validate_at: data.validate_at ? new Date(data.validate_at) : null,
         created_at: new Date()
      }

      this.items.push(checkIn)

      return checkIn
   }
}