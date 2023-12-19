import * as trpcExpress from "@trpc/server/adapters/express";
import cookie, { CookieSerializeOptions } from "cookie";
import jwt from "jsonwebtoken";
import { userID, user } from "../db/schema/user";
import { db } from "../db";
import { eq } from "drizzle-orm";
import ms from 'ms'
import { config } from "../config";





export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {


  // **********************************
  // * () => Cookie operation helpers *
  // **********************************
  const getCookies = () => {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return {};
    return cookie.parse(cookieHeader);
  };

  const getCookie = (name: string) => {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return;
    const cookies = cookie.parse(cookieHeader);
    return cookies[name];
  };

  const appendCookies = (
    items: Array<{
      name: string;
      value: string;
      options?: CookieSerializeOptions;
    }>,
  ) => {
    items.forEach(({ name, value, options }) => {
      res.appendHeader("Set-Cookie", cookie.serialize(name, value, options));
    });
  };


  const setRefreshTokenCookie = (userId: userID) => {

    const refreshToken = jwt.sign(
      userId,
      config.token.refresh.secret,
      {
        expiresIn: config.token.refresh.expiresIn
      }
    )

    const now = new Date()
    
    appendCookies([
      {
        name: "refreshToken",
        value: refreshToken,
        options: {
          expires: new Date(now.getUTCMilliseconds() + ms(config.token.refresh.expiresIn)),
          httpOnly: true,
          domain: config.env === 'local' ? undefined : config.domain,
          secure: config.env === 'local' ? false : true
        },
      },
    ]);

    return refreshToken
  };


  // ***************************
  // * () => JWT/token helpers *
  // ***************************
  const verifyAndGetUserIdFromRefreshToken = async (
    refreshToken: string,
  ): Promise<userID | undefined> => {
    return await new Promise((resolve, reject) =>
      jwt.verify(
        refreshToken,
        config.token.refresh.secret,
        async (err, decoded) =>
          err ? reject(undefined) : resolve(decoded as userID | undefined),
      ),
    );
  };

  const verifyAndGetUserIdFromAccessToken = async (
    accessToken: string,
  ): Promise<userID | undefined> => {
    return await new Promise((resolve, reject) =>
      jwt.verify(
        accessToken,
        config.token.access.secret,
        async (err, decoded) =>
          err ? reject(undefined) : resolve(decoded as userID | undefined),
      ),
    );
  };

  const generateAccessToken = (userId: userID): string => {
    return jwt.sign(userId, config.token.access.secret, {
      expiresIn: config.token.access.expiresIn
    })
  }

  const mandatoryContext = {
    getCookie,
    getCookies,
    appendCookies,
    setRefreshTokenCookie,
    verifyAndGetUserIdFromRefreshToken,
    verifyAndGetUserIdFromAccessToken,
    db,
    generateAccessToken,
    userAgent: req.headers["user-agent"],
  };

  // Get access token from cookies
  const accessToken = req.headers.authorization;

  let foundUserWithClient = undefined;
  // Now lets verify/decode it to see what's inside
  if (accessToken) {
    const foundUserId = await verifyAndGetUserIdFromAccessToken(accessToken);
    if (!foundUserId) {
      // didnt find no userID so we return without it
    } else {
      // found userID so we attempt to find user from db then return it with client for convenience
      const userId = foundUserId;
      foundUserWithClient = await db.query.user.findFirst({
        where: eq(user.id, userId),
        with: {
          client: true,
        },
      });
    }
  }

  return {
    ...mandatoryContext,
    user: foundUserWithClient,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
