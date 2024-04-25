FROM node:21-alpine3.18
WORKDIR /app/source
COPY package*.json ./
RUN npm install typescript
RUN npm install
COPY . .
RUN npm run build
CMD ["npm","run","prod"]