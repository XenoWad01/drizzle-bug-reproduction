import { eq } from "drizzle-orm"
import { db } from "../../db"

import { TRPCError } from "@trpc/server"
import { userID } from "../../db/schema/user"
import { session } from "../../db/schema/session"


// In case of emergency we just drop all the user's sessions and they will have to relog 
// This will only happen in the case of suspicious activity
export const pullThePlug = async (userId: userID) => {
    await db.delete(session).where(eq(session.userId, userId))
    throw new TRPCError({
        message: "Refresh token invalid.",
        code: "UNAUTHORIZED"
    })

}
export const safetyProcedure = async (userId: userID, userAgent: string, providedToken: string) => {
    // Safety procedure: 
    // we delete all sessions (and automatically cascade refresh tokens) for the user if
    // the refreshToken is not the oldest one on the session (which is bound to userAgent)
    
    let shouldDoSafetyProcedure = false

    // get session or throw 
    const foundSession = await db.query.session.findFirst({
        where: (session, { eq, and }) => and(eq(session.userId, userId), eq(session.userAgent, userAgent))
    })
    if (!foundSession) {
        shouldDoSafetyProcedure = true
    }

    if(!shouldDoSafetyProcedure) {
        // get last issued refresh token from session with userId and userAgent and token OR throw
        const lastIssuedRefreshToken = await db.query.refreshToken.findFirst({
            where: (refreshToken, { eq, and }) => 
                and(
                    eq(refreshToken.sessionId, foundSession!.id), 
                    eq(refreshToken.token, providedToken)
                ),
                orderBy: (refreshToken, { desc }) => [desc(refreshToken.createdAt)]
        })

        if(!lastIssuedRefreshToken) {
            shouldDoSafetyProcedure = true
        }
    }

    if(shouldDoSafetyProcedure) {
        await pullThePlug(userId)
    }

    return { 
        foundSession: foundSession! 
    }
}