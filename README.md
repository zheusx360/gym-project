## ------ <<<[ App estilo GymPass ]>>> ------ ##

## Requisitos funcionais (RFs)
- [] Deve ser possível se cadastrar;
- [] Deve ser possível fazer login;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter o histórico de check-ins;
- [] Deve ser possível obter a lista de academia mais proximas;
- [] Deve ser possível o usuário obter a academia por nome;
- [] Deve ser possível o usuário fazer check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

## Regras de negócio (RNs)
- [] O usuário não pode ser cadastrar com um email duplicado;
- [] O usuário não pode fazer dois check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto da academia;  
- [] O check-in só pode ser válidado por adminstradores;
- [] A academia só pode ser cadatrada por administradores;

## Requisitos não funcionais (RNFs)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar perstidos em um banco de dados postgressSQL
- [] Todas as litas de dados precisam estar paginadas com itens com 20 itens por pagina;
- [] O usuario deve ser autenticado por um JWT (JSON web token);

 