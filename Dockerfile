FROM node:18

# ENV TURBO_VERSION 1.6.1
# ENV YARN_VERSION 3.2.4

# RUN yarn policies set-version $YARN_VERSION
# RUN yarn dlx turbo@$TURBO_VERSION --version

# WORKDIR /bookd/
# COPY ["package.json", "./"]
# COPY ["turbo.json", "./"]
# COPY [".yarnrc.yml", "./"]

# COPY ["apps/zenpetclub-booking/package.json", "./"]
# COPY ["packages/bookd-api/package.json", "./"]
# COPY ["packages/bookd-ui/package.json", "./"]
# COPY ["packages/tsconfig/package.json", "./"]

# RUN yarn install
# COPY . .

# EXPOSE 3000
# EXPOSE 4000

# USER node
# CMD node
