## ------ <<<[ App estilo GymPass ]>>> ------ ##

## Requisitos funcionais (RFs)
- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível fazer login;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter o histórico de check-ins;
- [X] Deve ser possível obter a lista de academia mais proximas (Até 10km);
- [X] Deve ser possível o usuário obter a academia por nome;
- [X] Deve ser possível o usuário fazer check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia;

## Regras de negócio (RNs)
- [X] O usuário não pode ser cadastrar com um email duplicado;
- [X] O usuário não pode fazer dois check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto da academia (100 metros);  
- [X] O check-in só posde ser válidado até 20 minutos após ser criado;  
- [] O check-in só pode ser válidado por adminstradores;
- [] A academia só pode ser cadatrada por administradores;

## Requisitos não funcionais (RNFs)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar perstidos em um banco de dados postgressSQL
- [X] Todas as litas de dados precisam estar paginadas com itens com 20 itens por pagina;
- [] O usuario deve ser autenticado por um JWT (JSON web token);

 