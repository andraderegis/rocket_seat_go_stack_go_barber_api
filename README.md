# Funcionalidades da Aplicação
## Recuperação de senha

**Requisitos Funcionais**
- O usuário deve poder recuperar sua senha informando o seu e-mail
- O usuário deve receber um e-mail com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**Requisitos Não Funcionais**
- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento
- Utilizar o Amazon SES para envio em produção
- O envio de e-mails deve acontecer em segund plano (background job)

**Regras de Negócios**
- O link enviado por e-mail para resetar a senha deve expirar em 2h
- O usuário precisa confirmar a nova senha ao resetar sua senha

## Atualizaçao do perfil
**Requisitos Funcionais**
- O usuário deve poder atualizar seu nome, email e senha

**Regras de Negócios**
- O usuário não pode alterar o seu email para um email já utilizado
- Para atualizar a sua senha, o usuário deve informar a senha antiga
- Para atualizar a sua senha, o usuário precisa confirmar a sua senha
## Painel do prestador
**Requisitos Funcionais**
- O usuário deve poder listar seu agendamento de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas;

**Requisitos Não Funcionais**
- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**Regras de Negócios**
- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar
## Agendamento de Serviços
**Requisitos Funcionais**
- O usuário deve poder listar todos os prestadores se serviços cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário  disponível de um prestador
- O usuário deve poder listrar horários disponíveis de um dia específico de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador

**Requisitos Não Funcionais**
- A listagem de prestadores deve ser armazenada em cache

**Regras de Negócios**
- Cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponíveis entre 8h às 18h (primeiro às 8h, último às 17h)
- O usuário não pode agendar em um usuário já ocupado
- O usuário não pode agendar em um horário que já passou
- O usuário (prestador) não pode agendar serviços consigo


