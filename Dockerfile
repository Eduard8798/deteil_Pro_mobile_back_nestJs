FROM node:24

WORKDIR /app

COPY package-lock.json ./

COPY package.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]

