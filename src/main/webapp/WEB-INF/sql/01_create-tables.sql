-- quick EMPTY : truncate "user", blog, blog_tag, blog_type, blog_message RESTART IDENTITY cascade;
-- quick DROP  : drop table  "user",blog, blog_tag, blog_type, blog_message;

-- --------- user --------- --
CREATE TABLE "user"
(
	id bigserial NOT NULL,
	username character varying(128),
	"fullName" character varying(128),
	pwd character varying(256),
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
	content text,
	"tagIds" bigint[],
	"typeId" bigint,
	"viewCount" bigint,
	"isTop" boolean,
	"userId" bigint,
	"ctime" timestamp without time zone,
	"utime" timestamp without time zone,
	CONSTRAINT blog_pkey PRIMARY KEY (id)
);
create index on "user" (username);
-- --------- /blog --------- --

-- --------- blog_tag --------- --
CREATE TABLE "blog_tag"
(
	id bigserial NOT NULL,
	name character varying(128),
	color character varying(128),
	"ctime" timestamp without time zone,
	"utime" timestamp without time zone,
	CONSTRAINT blog_tag_pkey PRIMARY KEY (id)
);
-- --------- /blog_tag --------- --

-- --------- blog_type --------- --
CREATE TABLE "blog_type"
(
	id bigserial NOT NULL,
	name character varying(128),
	"ctime" timestamp without time zone,
	"utime" timestamp without time zone,
	CONSTRAINT blog_type_pkey PRIMARY KEY (id)
);
-- --------- /blog_type --------- --

-- --------- blog_message --------- --
CREATE TABLE "blog_message"
(
	id bigserial NOT NULL,
	username character varying(128),
	email character varying(128),
	content text,
	blogId bigint,
	pid bigint,
	"ctime" timestamp without time zone,
	"utime" timestamp without time zone,
	CONSTRAINT blog_message_pkey PRIMARY KEY (id)
);
-- --------- /blog_message --------- --