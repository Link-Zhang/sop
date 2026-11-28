-- noinspection SqlResolve @ routine/"uuidv7"
CREATE TABLE IF NOT EXISTS todo
(
  id      uuid PRIMARY KEY      DEFAULT uuidv7(),
  content varchar(256) NOT NULL CHECK (content ~ '\S'),
  status  boolean      NOT NULL DEFAULT false,
  date    timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_todo_date ON todo (date DESC);
