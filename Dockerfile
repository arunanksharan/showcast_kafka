FROM node:18.13-alpine

# Set the working directory inside the container
WORKDIR /showcast_kafka

COPY . /showcast_kafka

RUN npm ci

EXPOSE 3000

CMD ["node", "src/index.js"] 