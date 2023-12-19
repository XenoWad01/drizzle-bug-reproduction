CREATE TABLE IF NOT EXISTS "aditionalService" (
	"id" varchar PRIMARY KEY NOT NULL,
	"serviceName" varchar NOT NULL,
	"price" integer NOT NULL,
	"bookingId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "aditionalService_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookingSnapshot" (
	"id" varchar PRIMARY KEY NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp NOT NULL,
	"note" varchar,
	"snapshotFrom" timestamp NOT NULL,
	"userEmail" varchar NOT NULL,
	"totalPrice" integer NOT NULL,
	"upfrontPaymentDueAt" timestamp NOT NULL,
	"upfrontPaymentPrice" integer NOT NULL,
	"isUpfrontPayed" boolean,
	"petInRoom" json,
	"rooms" json,
	"status" varchar,
	"aditionalServices" json,
	"bookingId" varchar NOT NULL,
	"clientId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bookingSnapshot_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booking" (
	"id" varchar PRIMARY KEY NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp NOT NULL,
	"note" varchar,
	"upfrontPaymentDueAt" timestamp NOT NULL,
	"upfrontPaymentPrice" integer NOT NULL,
	"isUpfrontPayed" boolean DEFAULT false,
	"isCheckInPayed" boolean DEFAULT false,
	"bigserial" bigint,
	"clientId" varchar NOT NULL,
	"statusId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "booking_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "client" (
	"id" varchar PRIMARY KEY NOT NULL,
	"note" varchar,
	"discountId" varchar,
	"userId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "client_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "discount" (
	"id" varchar PRIMARY KEY NOT NULL,
	"percentage" integer NOT NULL,
	"flatValue" integer NOT NULL,
	"clientId" varchar,
	"membershipTypeId" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "discount_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "historyItem" (
	"id" varchar PRIMARY KEY NOT NULL,
	"entityName" varchar NOT NULL,
	"entityId" varchar NOT NULL,
	"clientId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "historyItem_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "membershipType" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"availableDays" integer NOT NULL,
	"isDisabled" boolean NOT NULL,
	"price" integer NOT NULL,
	"discountId" varchar,
	"roomTypeId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "membershipType_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "membership" (
	"id" varchar PRIMARY KEY NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp NOT NULL,
	"availableDays" integer NOT NULL,
	"isActive" boolean NOT NULL,
	"membershipTypeId" varchar NOT NULL,
	"clientId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "membership_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "petOnBooking" (
	"id" varchar PRIMARY KEY NOT NULL,
	"bookingId" varchar NOT NULL,
	"roomId" varchar NOT NULL,
	"petId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "petOnBooking_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pet" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"breed" varchar,
	"note" varchar,
	"clientId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pet_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roomType" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "roomType_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "room" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"roomNumber" integer NOT NULL,
	"maxPetCount" integer NOT NULL,
	"roomColor" varchar NOT NULL,
	"note" varchar,
	"price" integer NOT NULL,
	"roomTypeId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "room_id_unique" UNIQUE("id"),
	CONSTRAINT "room_name_unique" UNIQUE("name"),
	CONSTRAINT "room_roomNumber_unique" UNIQUE("roomNumber")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "status" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"color" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "status_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"done" boolean DEFAULT false,
	"note" varchar,
	"isExternal" boolean DEFAULT false NOT NULL,
	"aditionalServiceId" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "task_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"name" varchar NOT NULL,
	"isAdmin" boolean DEFAULT false NOT NULL,
	"clientId" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "aditionalService" ADD CONSTRAINT "aditionalService_bookingId_booking_id_fk" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookingSnapshot" ADD CONSTRAINT "bookingSnapshot_bookingId_booking_id_fk" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookingSnapshot" ADD CONSTRAINT "bookingSnapshot_clientId_client_id_fk" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_clientId_client_id_fk" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_statusId_status_id_fk" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client" ADD CONSTRAINT "client_discountId_discount_id_fk" FOREIGN KEY ("discountId") REFERENCES "discount"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client" ADD CONSTRAINT "client_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "discount" ADD CONSTRAINT "discount_clientId_client_id_fk" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "discount" ADD CONSTRAINT "discount_membershipTypeId_membershipType_id_fk" FOREIGN KEY ("membershipTypeId") REFERENCES "membershipType"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "historyItem" ADD CONSTRAINT "historyItem_clientId_client_id_fk" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "membershipType" ADD CONSTRAINT "membershipType_discountId_discount_id_fk" FOREIGN KEY ("discountId") REFERENCES "discount"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "membershipType" ADD CONSTRAINT "membershipType_roomTypeId_roomType_id_fk" FOREIGN KEY ("roomTypeId") REFERENCES "roomType"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "membership" ADD CONSTRAINT "membership_membershipTypeId_membershipType_id_fk" FOREIGN KEY ("membershipTypeId") REFERENCES "membershipType"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "membership" ADD CONSTRAINT "membership_clientId_client_id_fk" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "petOnBooking" ADD CONSTRAINT "petOnBooking_bookingId_booking_id_fk" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "petOnBooking" ADD CONSTRAINT "petOnBooking_roomId_room_id_fk" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "petOnBooking" ADD CONSTRAINT "petOnBooking_petId_pet_id_fk" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pet" ADD CONSTRAINT "pet_clientId_client_id_fk" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room" ADD CONSTRAINT "room_roomTypeId_roomType_id_fk" FOREIGN KEY ("roomTypeId") REFERENCES "roomType"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_aditionalServiceId_aditionalService_id_fk" FOREIGN KEY ("aditionalServiceId") REFERENCES "aditionalService"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_clientId_client_id_fk" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
