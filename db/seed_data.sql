drop table if exists users;

create table if not exists users (
  user_id serial,
  first_name varchar(50),
  last_name varchar(50),
  email varchar(50)
);

insert into users(
  first_name,
  last_name,
  email
) values (
  'Bryan',
  'Smith',
  'bryan@fake.com'
);

insert into users(
  first_name,
  last_name,
  email
) values (
  'Lindsey',
  'Smith',
  'lindsey@fake.com'
);

insert into users(
  first_name,
  last_name,
  email
) values (
  'Coco',
  'Smith',
  'coco@fake.com'
);