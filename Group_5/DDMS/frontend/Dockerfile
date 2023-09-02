FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
ARG BACKEND_HOST
ENV REACT_APP_API_HOST='192.168.1.7'
RUN npm run build
EXPOSE 3000
ENV NODE_ENV=production

CMD ["npm", "run", "deploy"]