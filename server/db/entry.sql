
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    date TIMESTAMP NOT NULL,
    text TEXT NOT NULL,
    category VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    entry_id INTEGER REFERENCES entries(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password_hash) VALUES
('john_doe', 'john.doe@example.com', 'hashedpassword123'),
('jane_smith', 'jane.smith@example.com', 'hashedpassword456');

INSERT INTO entries (user_id, date, text, category) VALUES
(1, '2024-07-28 10:00:00', 'Today was a great day! I went walking along the Thames and saw some beautiful scenery.', 'Leisure'),
(1, '2024-07-29 12:30:00', 'Tried a new recipe for lunch. It turned out delicious!', 'Food'),
(2, '2024-07-30 15:45:00', 'Had a productive work session and completed a major project.', 'Work');

INSERT INTO images (entry_id, image_url) VALUES
(1, 'http://example.com/images/hiking.jpg'),
(2, 'http://example.com/images/recipe.jpg'),
(3, 'http://example.com/images/work.jpg');
