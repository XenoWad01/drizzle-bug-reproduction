import { notAllOfTheseAreHere } from "./utils/or";
import * as dotenv from "dotenv";
dotenv.config()

type Environment = 'local' | 'dev' | 'staging' | 'prod'


export const getPrivateConfig = () => {
    const ENVIRONMENT = process.env.ENVIRONMENT as (Environment | undefined);
    const DATABASE_DOMAIN = process.env.DATABASE_DOMAIN;
    const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
    const DATABASE_PWD = process.env.DATABASE_PWD;
    const DATABASE_PORT = process.env.DATABASE_PORT;
    const DATABASE_NAME = process.env.DATABASE_NAME;
    const PORT = process.env.PORT
    const ACCESS_SECRET = process.env.ACCESS_SECRET
    const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN
    const REFRESH_SECRET = process.env.REFRESH_SECRET
    const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN
    const PROTOCOL: 'http' | 'https' = process.env.PROTOCOL as 'http' | 'https'
    const DOMAIN = process.env.DOMAIN

    if (notAllOfTheseAreHere([
        ENVIRONMENT as never,
        DATABASE_DOMAIN as never,
        DATABASE_USERNAME as never,
        DATABASE_PWD as never,
        DATABASE_PORT as never,
        PORT as never,
        ACCESS_SECRET as never,
        REFRESH_SECRET as never,
        DOMAIN as never,
        PROTOCOL as never,
        REFRESH_EXPIRES_IN as never,
        ACCESS_EXPIRES_IN as never,
    ])) {
        throw new Error('You forgot to set some env vars inside booking-api/.env')
    }

    return {
        env: ENVIRONMENT! as Environment,
        token: {
            access: {
                secret: ACCESS_SECRET!,
                expiresIn: ACCESS_EXPIRES_IN!, // used only for jwt
            },
            refresh: {
                secret: REFRESH_SECRET!, 
                expiresIn: REFRESH_EXPIRES_IN!, // used for both jwt and cookie
            }
        },
        port: PORT!,
        dbConnectionString: `postgres://${DATABASE_USERNAME}:${DATABASE_PWD}@${DATABASE_DOMAIN}:${DATABASE_PORT}/${DATABASE_NAME}`,
        domain: DOMAIN!,
        url: ENVIRONMENT === 'local' ? `http://localhost:${PORT}` : `${PROTOCOL}${DOMAIN}`,
        protocol: PROTOCOL!,
    }
}

export const config = getPrivateConfig()
// TODO When we need something public 
// TODO for example when we want to import something from the backend into the frontend, 
// TODO we definetly don't want to expose sensitive credentials to the bundled frontend code.
// TODO So we will only use the getPublicConfig for that exact case and only expose public
// TODO variables.
// TODO! Not sure if this works, think of the runtime/build type implications a bit maybe
// TODO! it's simply not possible 
export const getPublicConfig = () => {
    return {
        url: config.url
    }
}