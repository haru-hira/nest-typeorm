FROM node:22.13.1-alpine3.20 AS build

WORKDIR /app

# コードプロジェクトをDocker Imageにコピーする
COPY backend/ ./backend
RUN apk add --no-cache libcap \
    && setcap 'cap_net_bind_service=+ep' /usr/local/bin/node \
    # Postgreインストール(保存しません)
    && apk add --no-cache postgresql-client \
    # AWSクライアントインストール(保存しません)
    && apk add --no-cache aws-cli
COPY migrate-and-start.sh ./migrate-and-start.sh
# Grant Permission for script file
RUN chmod +x ./migrate-and-start.sh \
    && chown -R node:node ./backend

# Shellscriptを呼び出します。
USER node
ENTRYPOINT [ "/bin/sh", "-c" ]
CMD ["/app/migrate-and-start.sh dev" ]
EXPOSE 80
