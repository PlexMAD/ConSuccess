WITH ranked_users AS (
  SELECT
    id,
    lower(username) AS normalized_username,
    row_number() OVER (PARTITION BY lower(username) ORDER BY id) AS duplicate_index
  FROM users
)
UPDATE users AS u
SET username = CASE
  WHEN r.duplicate_index = 1 THEN r.normalized_username
  ELSE r.normalized_username || '_' || u.id::text
END
FROM ranked_users AS r
WHERE u.id = r.id;

CREATE OR REPLACE FUNCTION lowercase_username()
RETURNS trigger AS $$
BEGIN
  NEW.username := lower(trim(NEW.username));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_lowercase_username ON users;

CREATE TRIGGER users_lowercase_username
BEFORE INSERT OR UPDATE OF username ON users
FOR EACH ROW
EXECUTE FUNCTION lowercase_username();
