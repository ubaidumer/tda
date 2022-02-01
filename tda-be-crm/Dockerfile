FROM node:14-alpine

ADD . /tda-be-crm

WORKDIR /tda-be-crm

ENV NODE_TLS_REJECT_UNAUTHORIZED 0  

RUN chgrp -R 0 /tda-be-crm/src && chmod -R g=u /tda-be-crm/src

RUN npm install

RUN npm run build

CMD ["node", "dist/main"]