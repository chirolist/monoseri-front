# builder
FROM public.ecr.aws/docker/library/node:22-slim AS builder
ENV TZ=Asia/Tokyo
WORKDIR /app
COPY . .
RUN yarn install --production && yarn build
# server
FROM public.ecr.aws/docker/library/node:22-slim
ENV TZ=Asia/Tokyo
WORKDIR /app
COPY --from=builder \
  /app/package.json \
  /app/yarn.lock \
  /app/.yarnrc.yml \
  /app/next.config.js \
  /app/tsconfig.json \
  ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/env ./env
COPY --from=builder /app/public ./public
RUN yarn install --production
EXPOSE 3000
CMD ["/bin/sh", "-c", "yarn start"]
