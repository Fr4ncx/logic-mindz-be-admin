FROM node:lts-hydrogen

WORKDIR /opt/app

COPY .npmrc ./
COPY package.json package-lock.json ./
RUN npm cache clear --force && npm ci --omit=dev

COPY . .

RUN npm run build && rm -rf src

EXPOSE 3300

CMD npm run start