FROM node:14-alpine

ADD . /tda-be-admin

WORKDIR /tda-be-admin

ENV NODE_TLS_REJECT_UNAUTHORIZED 0  

RUN chgrp -R 0 /tda-be-admin/src && chmod -R g=u /tda-be-admin/src

RUN npm install

RUN npm run build

CMD ["node", "dist/main"]