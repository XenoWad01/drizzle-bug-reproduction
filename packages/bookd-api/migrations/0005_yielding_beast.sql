ALTER TABLE "refreshToken" ALTER COLUMN "token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "refreshToken" ADD CONSTRAINT "refreshToken_token_unique" UNIQUE("token");