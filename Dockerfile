FROM node:14.15.3-alpine3.10

WORKDIR /code

ENV APK_PACKAGES tini
ENV NODE_ENV production

RUN apk \
    --update-cache \
    --update add \
    ${APK_PACKAGES} \
    && rm -rf /var/cache/apk/*

COPY package.json ./

# Build
RUN npm install && npm cache clean

COPY . .

CMD [ "/sbin/tini", "node", "." ]
