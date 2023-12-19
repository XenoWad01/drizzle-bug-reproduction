# Getting started

1. Clone repo. It is also highly recomanded you use linux or WSL or mac. Any further commands will be run inside the project root folder unless specified otherwise.
2. Run `nvm use`. ([install nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if it's not on your system yet)
3. Run `yarn install` on a root level. This will in turn recursively install all the dependencies for all packages. ([install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) if it's not on your system yet)
4. [Install Docker Desktop](https://docs.docker.com/desktop/) (if you're using WSL this will be installed on windows)
5. [Install docker compose](https://docs.docker.com/compose/install/linux/#install-using-the-repository) (on linux)
6. Start Docker Desktop
7. Run docker `compose up -d` to initialize db container
8. Populate .env files under each project's folder.
9. You can now run `yarn run dev` to start the frontend/backend together. You will find what ports they are running on if you look at the logs after running.

## Good to know

#### ( * ) => How to generate secret keys

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
## How to interact with the db?
### ( * ) => Generate migration
```yarn run migrations:generate```
### ( * ) => Apply migrations
```yarn run migrations:push```
### ( * ) => Start up drizzle studio
```yarn run studio```
## Storybook
### marius completeaza aici ca cred ca stii mai bine rn