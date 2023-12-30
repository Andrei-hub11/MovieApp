FROM node:18

ARG VITE_MOVIE_APP_API_URL


# Define variáveis ​​de ambiente durante o processo de construção
ENV VITE_MOVIE_APP_API_URL=$VITE_MOVIE_APP_API_URL

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .


EXPOSE 5173

CMD ["npm", "run", "dev"]