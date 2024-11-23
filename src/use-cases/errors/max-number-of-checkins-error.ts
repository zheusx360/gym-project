export class MaxNumberOfCheckinsError extends Error {
   constructor() {
      super('Max numbers of checkins reached.')
   }
}