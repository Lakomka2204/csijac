CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    username character varying(32) COLLATE pg_catalog."default" NOT NULL,
    display_name character varying(64) COLLATE pg_catalog."default",
    password character varying(128) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT LOCALTIMESTAMP,
    preferences hstore,
    avatar character varying(64) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to csijac;

CREATE TABLE IF NOT EXISTS public.auth
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    token text COLLATE pg_catalog."default" NOT NULL DEFAULT md5((random())::text),
    ip inet NOT NULL,
    ua text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_accessed_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    additional_info jsonb,
    CONSTRAINT auth_pkey PRIMARY KEY (id),
    CONSTRAINT "FK_USERID" FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.auth
    OWNER to csijac;
-- Index: fki_FK_USERID

-- DROP INDEX IF EXISTS public."fki_FK_USERID";

CREATE INDEX IF NOT EXISTS "fki_FK_USERID"
    ON public.auth USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;
    
CREATE TABLE IF NOT EXISTS public.videos
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(5000) COLLATE pg_catalog."default",
    thumbnail uuid,
    duration integer NOT NULL,
    upload_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_private boolean DEFAULT false,
    CONSTRAINT videos_pkey PRIMARY KEY (id),
    CONSTRAINT videos_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.videos
    OWNER to csijac;
-- Index: idx_user_id

-- DROP INDEX IF EXISTS public.idx_user_id;

CREATE INDEX IF NOT EXISTS idx_user_id
    ON public.videos USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;