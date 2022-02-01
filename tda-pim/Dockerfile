FROM node:14-alpine

ADD . /tda-be-pim

WORKDIR /tda-be-pim

ENV NODE_TLS_REJECT_UNAUTHORIZED 0  

RUN chgrp -R 0 /tda-be-pim/src && chmod -R g=u /tda-be-pim/src

RUN npm install

RUN npm run build

CMD ["node", "dist/main"]