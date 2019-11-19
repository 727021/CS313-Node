CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30),
    dateOfBirth date
);
CREATE TABLE relationships (
    relationshipID SERIAL PRIMARY KEY,
    parent_id int REFERENCES person(id),
    child_id int REFERENCES person(id)
);
INSERT INTO person (firstName, lastName, dateOfBirth) VALUES
(
    'John',
    'Larson',
    '1995-08-10'
),
(
    'Brian',
    'Larson',
    '1970-08-05'
),
(
    'Tiffany',
    'Jacklin',
    '1973-08-15'
);
INSERT INTO relationships (parent_id, child_id) VALUES
(
    (SELECT id FROM person WHERE firstName = 'Brian'),
    (SELECT id FROM person WHERE firstName = 'John')
);