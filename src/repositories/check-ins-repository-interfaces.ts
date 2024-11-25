import { CheckIn, Prisma } from "@prisma/client";

export interface CheckinRepositoryInterface {
   create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
   findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
   counterByUserId(userId: string): Promise<number>
   findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
   findById(checkinId: string): Promise<CheckIn | null>
   save(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}