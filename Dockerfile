FROM oven/bun:1.0.26-alpine

# Get from .env
ARG PROJECT
RUN echo "Project: ${PROJECT}"

# Install bash
RUN apk add --no-cache bash

WORKDIR /_projects/${PROJECT}

COPY package*.json ./

RUN bun install --global tsx

RUN bun install

USER root

CMD ["tail", "-f", "/dev/null"]
