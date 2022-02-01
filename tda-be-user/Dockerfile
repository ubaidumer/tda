FROM node:14-alpine

ADD . /tda-be-user

WORKDIR /tda-be-user

ENV NODE_TLS_REJECT_UNAUTHORIZED 0  

RUN chgrp -R 0 /tda-be-user/src && chmod -R g=u /tda-be-user/src

RUN npm install

RUN npm run build

CMD ["node", "dist/main"]