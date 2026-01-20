FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npx turbo run build --filter=api

EXPOSE 4000

CMD ["npm", "run", "--workspace=apps/api", "start"]