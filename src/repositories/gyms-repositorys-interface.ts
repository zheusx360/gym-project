import { Gym, Prisma } from "@prisma/client";

export interface FindManyNearyParams {
   latitude: number,
   longitude: number
}

export interface GymsRepositoryInterface {
   findById(id: string): Promise<Gym | null>
   create(data: Prisma.GymCreateInput): Promise<Gym>
   searchMany(query: string, pages: number): Promise<Gym[]>
   findManyNearBy(params: FindManyNearyParams): Promise<Gym[]>
}