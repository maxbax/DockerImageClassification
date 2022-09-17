FROM node:14.17.0

COPY package* .

RUN npm ci

COPY src/ /src/
COPY public/ /public/
