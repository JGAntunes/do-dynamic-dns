ARG ARCH=
FROM ${ARCH}node:14.15.3-alpine3.10

WORKDIR /code

ENV APK_PACKAGES tini
ENV NODE_ENV production

RUN apk \
    --update-cache \
    --update add \
    ${APK_PACKAGES} \
    && rm -rf /var/cache/apk/*

COPY package.json package-lock.json ./

# Build
RUN npm install && npm cache clean --force

COPY . .

CMD [ "/sbin/tini", "node", "." ]
