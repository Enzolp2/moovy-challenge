# Moovy

Moovy é uma aplicação web para gerenciar sua biblioteca de filmes, onde você pode visualizar, adicionar, e excluir filmes, além de trazer os indices IMDB de cada filme e poder adicionar avaliações para os filmes existentes.

## Tecnologias Utilizadas

- **Frontend**: ReactJS, TypeScript, Material-UI
- **Backend**: Nest.js, TypeORM, TypeScript
- **Banco de Dados**: PostgreSQL
- **APIs**: Consumo de APIs externas para dados de filmes
- **Docker**: Utilização de Docker e Docker Compose

## Como Rodar

### Pré-requisitos

Antes de iniciar, verifique se você possui as seguintes ferramentas instaladas em seu sistema:

- Node.js
- npm (Node Package Manager) ou yarn
- Docker
- Docker Compose
- Postgres

### Passos para Executar a Aplicação

1. **Clone o repositório**

   ```bash
   git clone git@github.com:Enzolp2/moovy-challenge.git
   cd moovy-challenge
   ```

2. **Instale as Dependências**

   - Backend (Nest.js):

     ```bash
     cd server
     npm install   # ou yarn install
     ```

   - Frontend (ReactJS):

     ```bash
     cd client
     npm install   # ou yarn install
     ```

3. **Configuração do Banco de Dados**

   Certifique-se de que o PostgreSQL está instalado e configurado corretamente. Você pode ajustar as configurações de conexão no arquivo `server/.env`.

4. **Executar com Docker Compose**

   O Docker Compose será usado para configurar e orquestrar os containers necessários para o frontend, backend e banco de dados.

   Na raiz do projeto `moovy-challenge`, execute:

   ```bash
   docker-compose up --build
   ```

   Este comando irá construir as imagens Docker, iniciar os containers e mostrará os logs de execução. Aguarde até que todos os serviços estejam prontos e acessíveis.

5. **Acessar a Aplicação**

   Após todos os passos anteriores serem concluídos com sucesso, você poderá acessar a aplicação em seu navegador:

   - Frontend: [http://localhost:3000](http://localhost:5000)
   - Backend: A API estará disponível em [http://localhost:3000](http://localhost:3000)

## Funcionalidades

- **Adicionar Filme**: Permite adicionar novos filmes à biblioteca.
- **Visualizar Filmes**: Lista todos os filmes disponíveis na biblioteca.
- **Excluir Filme**: Remove um filme da biblioteca.
- **Adicionar Avaliações**: Permite aos usuários adicionar avaliações para os filmes existentes.

---

## Autor
Enzo Lemos - enzolp2@hotmail.com