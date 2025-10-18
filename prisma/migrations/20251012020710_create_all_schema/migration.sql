-- Crear tablas
CREATE TABLE "public"."category" (
  "id" uuid NOT NULL,
  "key" text NOT NULL,
  CONSTRAINT "pk_table_3_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."transaction" (
  "id" uuid NOT NULL,
  "category_id" uuid NOT NULL,
  "name" text NOT NULL,
  "transaction_date" timestamp with time zone NOT NULL,
  "amount" numeric NOT NULL,
  CONSTRAINT "pk_table_4_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."budget" (
  "id" uuid NOT NULL,
  "user_id" uuid,
  "category_id" uuid NOT NULL,
  "maximum" numeric NOT NULL DEFAULT 0,
  "theme" text NOT NULL,
  CONSTRAINT "pk_table_2_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."overview" (
  "id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "current_balance" numeric NOT NULL,
  "income_balance" numeric NOT NULL,
  "expenses_balance" numeric NOT NULL,
  CONSTRAINT "pk_table_5_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."pot" (
  "id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  "name" text NOT NULL,
  "target_value" numeric NOT NULL,
  "current_value" numeric NOT NULL,
  "theme" text,
  CONSTRAINT "pk_table_6_id" PRIMARY KEY ("id")
);

-- Índices útiles (opcionales pero recomendados)
CREATE INDEX "idx_transaction_category_id" ON "public"."transaction" ("category_id");
CREATE INDEX "idx_transaction_date" ON "public"."transaction" ("transaction_date");
CREATE INDEX "idx_budget_user_id" ON "public"."budget" ("user_id");
CREATE INDEX "idx_budget_category_id" ON "public"."budget" ("category_id");
CREATE INDEX "idx_overview_user_id" ON "public"."overview" ("user_id");
CREATE INDEX "idx_pot_user_id" ON "public"."pot" ("user_id");

-- Foreign keys (dirección correcta)
ALTER TABLE "public"."transaction"
  ADD CONSTRAINT "fk_transaction_category"
  FOREIGN KEY ("category_id") REFERENCES "public"."category"("id");

ALTER TABLE "public"."budget"
  ADD CONSTRAINT "fk_budget_category"
  FOREIGN KEY ("category_id") REFERENCES "public"."category"("id");

ALTER TABLE "public"."budget"
  ADD CONSTRAINT "fk_budget_user"
  FOREIGN KEY ("user_id") REFERENCES "public"."user"("id");

ALTER TABLE "public"."overview"
  ADD CONSTRAINT "fk_overview_user"
  FOREIGN KEY ("user_id") REFERENCES "public"."user"("id");

ALTER TABLE "public"."pot"
  ADD CONSTRAINT "fk_pot_user"
  FOREIGN KEY ("user_id") REFERENCES "public"."user"("id");
