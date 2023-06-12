FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN npm install dotenv

RUN npm install mongoose

RUN npm install @slack/webhook

RUN npm install bcryptjs

RUN npm install cors

RUN npm install nodemon

RUN npm install express

RUN npm install express-validator

RUN npm install jsonwebtoken

RUN npm install morgan-body

RUN npm install multer

EXPOSE 3000

RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf

RUN npm start
