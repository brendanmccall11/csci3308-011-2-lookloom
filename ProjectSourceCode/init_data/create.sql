DROP TABLE IF EXISTS users;
CREATE TABLE users (
  username VARCHAR(100) PRIMARY KEY,
  password VARCHAR(100) NOT NULL
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS items;
CREATE TABLE items (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  price SMALLINT,
  image_url VARCHAR(200) NOT NULL,
  link VARCHAR(200),
  description VARCHAR(200),
  brand VARCHAR(50)
);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS outfits;
CREATE TABLE outfits (
  outfit_id SERIAL PRIMARY KEY,
  outfit_name VARCHAR(100) UNIQUE NOT NULL,
  price SMALLINT,
  image_url VARCHAR(200) NOT NULL,
  link VARCHAR(200),
  description VARCHAR(200),
  brand VARCHAR(50)
);

DROP TABLE IF EXISTS prerequisites;
CREATE TABLE IF NOT EXISTS prerequisites (
  course_id INTEGER NOT NULL REFERENCES courses (course_id),
  prerequisite_id INTEGER NOT NULL REFERENCES courses (course_id)
);

-- Views to simplify queries in the server.

CREATE OR REPLACE VIEW course_prerequisite_count AS
  SELECT
    c.course_id,
    COUNT(p.prerequisite_id) AS num_prerequisites
  FROM
    courses AS c
    LEFT JOIN prerequisites AS p ON c.course_id = p.course_id
  GROUP BY c.course_id;

CREATE OR REPLACE VIEW student_prerequisite_count AS
  SELECT
    c.course_id,
    sc.student_id,
    COUNT(*) AS num_prerequisites_satisfied
  FROM
    courses AS c
    LEFT JOIN prerequisites AS p ON c.course_id = p.course_id
    LEFT JOIN student_courses AS sc ON p.prerequisite_id = sc.course_id
  GROUP BY c.course_id, sc.student_id;
