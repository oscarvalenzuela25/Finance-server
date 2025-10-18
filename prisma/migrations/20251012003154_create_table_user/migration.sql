CREATE TABLE "public"."user" (
    "id" uuid NOT NULL,
    "name" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    CONSTRAINT "pk_User_id" PRIMARY KEY ("id")
);
