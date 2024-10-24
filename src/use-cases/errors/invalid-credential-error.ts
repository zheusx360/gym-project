export class InvalidCredentialError extends Error {
   constructor() {
      super('Usuário ou senha inválidos!')
      this.name = 'InvalidCredentialError';
   }
}