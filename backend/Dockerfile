# --- Build Stage ---
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

COPY .env .env

RUN npm run build

FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist
COPY .env .env


EXPOSE 5001

# Starte die Anwendung
CMD ["npm", "start"]
