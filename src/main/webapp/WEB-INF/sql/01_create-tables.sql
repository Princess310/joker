-- quick EMPTY : truncate "user", project, ticket, team, teamuser RESTART IDENTITY cascade;
-- quick DROP  : drop table  "user", project, ticket, team, teamuser;

-- --------- user --------- --
CREATE TABLE "user"
(
	id bigserial NOT NULL,
	username character varying(128),
	"fullName" character varying(128),
	pwd character varying(256),
	CONSTRAINT user_pkey PRIMARY KEY (id)
);
create index on "user" (username);
-- --------- /user --------- --
