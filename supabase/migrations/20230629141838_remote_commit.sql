drop policy "Users can insert their own profile." on "public"."profiles";

drop policy "Users can update own profile." on "public"."profiles";

alter table "public"."profiles" drop constraint "profiles_username_key";

alter table "public"."profiles" drop constraint "username_length";

drop index if exists "public"."profiles_username_key";

create table "public"."invites" (
    "id" uuid not null default gen_random_uuid(),
    "creator" uuid,
    "team" uuid,
    "invitee" uuid
);


alter table "public"."invites" enable row level security;

create table "public"."team_profiles" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "name" text not null default ''::text,
    "discordServer" text not null default ''::text
);


alter table "public"."team_profiles" enable row level security;

create table "public"."team_ratings" (
    "team_id" uuid not null,
    "rating" double precision default '1500'::double precision,
    "rd" double precision default '300'::double precision,
    "volitility" double precision default '0.6'::double precision
);


alter table "public"."team_ratings" enable row level security;

create table "public"."team_registry" (
    "user_id" uuid not null,
    "team_id" uuid
);


alter table "public"."team_registry" enable row level security;

alter table "public"."profiles" drop column "avatar_url";

alter table "public"."profiles" drop column "full_name";

alter table "public"."profiles" drop column "username";

alter table "public"."profiles" drop column "website";

alter table "public"."profiles" add column "discordId" text not null default ''::text;

alter table "public"."profiles" add column "ign" text default ''::text;

CREATE UNIQUE INDEX invites_pkey ON public.invites USING btree (id);

CREATE UNIQUE INDEX team_profiles_pkey ON public.team_profiles USING btree (id);

CREATE UNIQUE INDEX team_ratings_pkey ON public.team_ratings USING btree (team_id);

CREATE UNIQUE INDEX team_registry_pkey ON public.team_registry USING btree (user_id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree ("discordId");

alter table "public"."invites" add constraint "invites_pkey" PRIMARY KEY using index "invites_pkey";

alter table "public"."team_profiles" add constraint "team_profiles_pkey" PRIMARY KEY using index "team_profiles_pkey";

alter table "public"."team_ratings" add constraint "team_ratings_pkey" PRIMARY KEY using index "team_ratings_pkey";

alter table "public"."team_registry" add constraint "team_registry_pkey" PRIMARY KEY using index "team_registry_pkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length("discordId") >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

create policy "Enable read access for all users"
on "public"."invites"
as permissive
for select
to public
using (true);


create policy "Enable delete for users based on user_id"
on "public"."profiles"
as permissive
for all
to public
using ((auth.uid() = id));


create policy "Enable read access for all users"
on "public"."team_profiles"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."team_registry"
as permissive
for select
to public
using (true);



