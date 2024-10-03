export class UserAlreadyExistsError extends Error {
   constructor() {
      super('Email já cadastrado!')
      this.name = 'UserAlreadyExistsError';
   }
}