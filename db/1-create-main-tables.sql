CREATE TABLE customers (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TINYTEXT,
  email TINYTEXT
);

CREATE TABLE sizes (
  id INTEGER NOT NULL PRIMARY KEY,
  customer_id INT NOT NULL,
  bust VARCHAR(15),
  waist VARCHAR(15),
  hip VARCHAR(15),
  back VARCHAR(15),
  cleavage VARCHAR(15),
  arm VARCHAR(15),
  sleeve VARCHAR(15),
  crotch VARCHAR(15),
  bust_height VARCHAR(15),
  body_length VARCHAR(15),
  skirt_length VARCHAR(15),
  pants_length VARCHAR(15)
);
