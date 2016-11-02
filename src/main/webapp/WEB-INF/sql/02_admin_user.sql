-- Insert the admin user
insert into "user" (id, username, pwd, admin ) values (1, 'admin', 'welcome', true);
ALTER SEQUENCE user_id_seq restart 2;