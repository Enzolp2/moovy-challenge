# Usando uma imagem base do Node.js
FROM node:18

# Definindo o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiando os arquivos de dependências para o container
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando todo o código fonte para o diretório de trabalho do container
COPY . .

# Expondo a porta usada pelo servidor de desenvolvimento do React
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
