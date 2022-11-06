FROM node:alpine

WORKDIR /app

EXPOSE 5173

COPY package.json ./

RUN npm install

COPY  . ./

ENV NODE_ENV production

CMD ["npm", "run", "dev"]
