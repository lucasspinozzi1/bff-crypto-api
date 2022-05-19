# -------------------------------------------
# - Build application with <node:14-alpine> -
# -------------------------------------------
FROM node:14-alpine AS builder
WORKDIR  /usr/src/app

# Copy source code
COPY . .

# Install dependencies and devDependencies
RUN yarn --frozen-lockfile

# Build application
RUN yarn build

# Remove devDependencies
RUN yarn --production


# --------------------------------------
# - Build server image from <alpine:3> -
# --------------------------------------
FROM alpine:3 AS server

# Install NodeJS
RUN apk add nodejs=16.14.0-r0 --no-cache
WORKDIR /usr/src/app

# Copy built application code to server image
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 80

CMD ["node", "./dist/index.js"]
