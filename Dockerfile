FROM node:20-alpine

ARG PROYECT

# Install bash
RUN apk add --no-cache bash

WORKDIR /_projects/${PROYECT}

COPY package*.json ./

RUN yarn global add tsx

RUN yarn

CMD ["tail", "-f", "/dev/null"]