# -------------------------------------------
# - Build application with <node:14-alpine> -
# -------------------------------------------
FROM 477865057032.dkr.ecr.us-east-1.amazonaws.com/node:14-alpine AS builder
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
FROM 477865057032.dkr.ecr.us-east-1.amazonaws.com/alpine:3 AS server

# Install NodeJS
RUN apk add --update nodejs
WORKDIR /usr/src/app

# Copy built application code to server image
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 80

CMD ["node", "./dist/index.js"]
