# In.Orbit Server

Este repositório contém o backend do projeto **In.Orbit**, uma aplicação de lista de tarefas (*To-Do*) projetada para auxiliar os usuários a gerenciar suas metas de forma eficiente.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Express**: Framework web para Node.js, facilitando a criação de APIs RESTful.
- **Drizzle ORM**: ORM para interagir com o banco de dados de forma eficiente e tipada.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados da aplicação.

## Estrutura de Pastas

A estrutura principal do projeto é a seguinte:

- **src/**: Contém o código-fonte da aplicação.
  - **controllers/**: Define a lógica de controle, gerenciando as requisições e respostas.
  - **models/**: Contém as definições das entidades e a interação com o banco de dados através do Drizzle ORM.
  - **routes/**: Define as rotas da API, conectando URLs aos controladores correspondentes.
  - **middlewares/**: Inclui middlewares para tratamento de autenticação, validação e outras funcionalidades intermediárias.
  - **config/**: Arquivos de configuração, como variáveis de ambiente e configurações do banco de dados.

## Instalação e Uso

Para configurar e executar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Caarlos7x/in-orbit-server.git
   cd in-orbit-server
2. **Instale as dependências**:
   ```bash
   npm install

3. **Configure as variáveis de ambiente**:

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
  ```bash
  DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
  PORT=3000
```
Certifique-se de substituir usuario, senha e nome_do_banco pelas credenciais correspondentes do seu banco de dados PostgreSQL.

4. **Execute as migrações do banco de dados**:
   ```bash
   npm run migrate
Este comando aplicará as migrações necessárias para criar as tabelas e estruturas no banco de dados.

5. **Inicie o servidor**:
   ```bash
   npm run dev
O servidor estará em execução no endereço http://localhost:3000.

##Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para sugerir melhorias ou corrigir bugs.

##Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
