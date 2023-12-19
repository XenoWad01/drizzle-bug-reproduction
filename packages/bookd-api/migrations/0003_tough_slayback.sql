CREATE TABLE IF NOT EXISTS "refreshToken" (
	"id" varchar PRIMARY KEY NOT NULL,
	"token" varchar,
	"sessionId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "refreshToken_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "session" DROP COLUMN IF EXISTS "refreshToken";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "refreshToken" ADD CONSTRAINT "refreshToken_sessionId_session_id_fk" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
