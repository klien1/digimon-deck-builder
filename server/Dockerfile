FROM node:16

WORKDIR /app

EXPOSE 4000

COPY package.json ./

RUN npm install

COPY  . ./

ENV NODE_ENV production

CMD ["npm", "start"]

# USER node