FROM node:14-alpine

ADD . /tda-be-service

WORKDIR /tda-be-service

ENV NODE_TLS_REJECT_UNAUTHORIZED 0  

RUN chgrp -R 0 /tda-be-service/src && chmod -R g=u /tda-be-service/src

RUN npm install

RUN npm run build

CMD ["node", "dist/main"]