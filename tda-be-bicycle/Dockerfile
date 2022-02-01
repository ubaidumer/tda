FROM node:14-alpine

ADD . /tda-be-bicycle

WORKDIR /tda-be-bicycle

ENV NODE_TLS_REJECT_UNAUTHORIZED 0  

RUN chgrp -R 0 /tda-be-bicycle/src && chmod -R g=u /tda-be-bicycle/src

RUN npm install

RUN npm run build

CMD ["node", "dist/main"]