FROM node:14-alpine

ARG APP_PORT
ENV APP_PORT ${APP_PORT}

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install && \
    # For development environment, we want to use nodemon to keep the code running
    npm install -g nodemon && \
    npm install -g pm2@5.2.0 \

COPY . /app

# Expose web service and nodejs debug port
EXPOSE  3000
EXPOSE  8585

ENTRYPOINT ["node", "server.js"]

CMD ["pm2-docker", "ecosystem.config.js"]
