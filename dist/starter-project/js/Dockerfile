FROM node:18-alpine
ENV NODE_ENV=production
# Uncomment the following line to enable agent logging
# LABEL "network.immunx.settings.agent-logs.enable"="true"
WORKDIR /app
COPY ./src ./src
COPY package*.json ./
RUN npm ci --production
CMD [ "npm", "run", "start:prod" ]