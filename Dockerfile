FROM node:20-alpine

# Get from .env
ARG PROJECT

# Install bash
RUN apk add --no-cache bash

WORKDIR /_projects/${PROJECT}

COPY package*.json ./

RUN yarn global add tsx

RUN yarn

CMD ["tail", "-f", "/dev/null"]