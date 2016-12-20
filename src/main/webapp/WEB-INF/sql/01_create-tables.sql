-- quick EMPTY : truncate "user", blog, tag, blogtag, type, message, attachment RESTART IDENTITY cascade;
-- quick DROP  : drop table  "user",blog, tag, blogtag, type, message, attachment;

-- --------- user --------- --
CREATE TABLE "user"
(
	id bigserial NOT NULL,
	username character varying(128),
	"fullName" character varying(128),
	pwd character varying(256),
	"avatar" character varying(256),
	admin boolean DEFAULT false,
	CONSTRAINT user_pkey PRIMARY KEY (id)
);
create index on "user" (username);
-- --------- /user --------- --


-- --------- blog --------- --
CREATE TABLE "blog"
(
	id bigserial NOT NULL,
	title character varying(128),
	breif character varying(128),
	content text,
	"typeId" bigint,
	"viewCount" bigint DEFAULT 0,
	"isTop" boolean,
	"userId" bigint,
	"picFileId" bigint,
	"audioFileId" bigint,
	"ctime" timestamp without time zone,
	"utime" timestamp without time zone,
	CONSTRAINT blog_pkey PRIMARY KEY (id)
);
create index on "user" (username);
-- --------- /blog --------- --

-- --------- tag --------- --
CREATE TABLE "tag"
(
	id bigserial NOT NULL,
	name character varying(128),
	color character varying(128),
	"ctime" timestamp without time zone,
	"utime" timestamp without time zone,
	CONSTRAINT tag_pkey PRIMARY KEY (id)
);
-- --------- /tag --------- --

-- --------- blogtag --------- --
CREATE TABLE "blogtag"
(
	id bigserial NOT NULL,
	"blogId" bigint,
	"tagId" bigint,
	"ctime" timestamp without time zone,
	"utime" timestamp without time zone,
	CONSTRAINT blog_tag_pkey PRIMARY KEY (id)
);
-- --------- /blogtag --------- --

-- --------- type --------- --
CREATE TABLE "type"
(
	id bigserial NOT NULL,
	name character varying(128),
	"ctime" timestamp without time zone,
	"utime" timestamp without time zone,
	CONSTRAINT type_pkey PRIMARY KEY (id)
);
-- --------- /type --------- --

-- --------- message --------- --
CREATE TABLE "message"
(
	id bigserial NOT NULL,
	username character varying(128),
	email character varying(128),
	content text,
	"blogId" bigint,
	"userId" bigint,
	pid bigint,
	"ctime" timestamp without time zone,
	"utime" timestamp without time zone,
	CONSTRAINT message_pkey PRIMARY KEY (id)
);
-- --------- /message --------- --

-- --------- attachment --------- --
CREATE TABLE attachment
(
	id bigserial NOT NULL,
	"name" character varying(128),
	"ext" character varying(32),
	"path" character varying(256),
	"ctime" timestamp without time zone,
	"utime" timestamp without time zone,
	CONSTRAINT attachment_pkey PRIMARY KEY (id)
);
-- --------- /attachment --------- --