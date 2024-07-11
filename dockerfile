FROM node:16-alpine

RUN apk add --no-cache make g++ python3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]