FROM node:12

WORKDIR /var/www/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]