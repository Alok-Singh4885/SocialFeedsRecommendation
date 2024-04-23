from faker import Faker
import numpy as np
import random
import sqlite3

# Initialize Faker to generate fake data
fake = Faker()

# Create a SQLite database connection
conn = sqlite3.connect('social_media.db')
cursor = conn.cursor()

# Create tables
cursor.execute('''CREATE TABLE IF NOT EXISTS sports (
                    id INTEGER PRIMARY KEY,
                    name TEXT
                )''')

cursor.execute('''CREATE TABLE IF NOT EXISTS events (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    sport_id INTEGER,
                    FOREIGN KEY (sport_id) REFERENCES sports(id)
                )''')

cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY,
                    username TEXT UNIQUE
                )''')

cursor.execute('''CREATE TABLE IF NOT EXISTS posts (
                    id INTEGER PRIMARY KEY,
                    user_id INTEGER,
                    text TEXT,
                    sport_id INTEGER,
                    event_id INTEGER,
                    likes INTEGER,
                    comments INTEGER,
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (sport_id) REFERENCES sports(id),
                    FOREIGN KEY (event_id) REFERENCES events(id)
                )''')

# Mock data generation function
def generate_mock_data(num_posts):
    sports = ["Football", "Basketball", "Tennis", "Soccer", "Baseball"]
    events = {
        "Football": ["World Cup", "Champions League", "Premier League", "La Liga"],
        "Basketball": ["NBA Finals", "March Madness", "EuroLeague"],
        "Tennis": ["Wimbledon", "US Open", "French Open"],
        "Soccer": ["FIFA World Cup", "UEFA Euro", "Copa America"],
        "Baseball": ["World Series", "MLB All-Star Game", "World Baseball Classic"]
    }

    # Populate sports table
    sport_ids = []
    for sport in sports:
        cursor.execute("INSERT INTO sports (name) VALUES (?)", (sport,))
        sport_ids.append(cursor.lastrowid)

    # Populate events table
    event_ids = {}
    for sport, event_list in events.items():
        for event in event_list:
            cursor.execute("INSERT INTO events (name, sport_id) VALUES (?, ?)", (event, sport_ids[sports.index(sport)]))
            event_ids[event] = cursor.lastrowid

    # Populate users table
    for _ in range(50):
        cursor.execute("INSERT INTO users (username) VALUES (?)", (fake.user_name(),))

    # Generate mock posts
    for _ in range(num_posts):
        user_id = random.randint(1, 50)
        text = fake.text()
        sport = random.choice(sports)
        event = random.choice(events[sport])
        sport_id = sport_ids[sports.index(sport)]
        event_id = event_ids[event]
        likes = np.random.randint(0, 100)
        comments = np.random.randint(0, 50)

        cursor.execute("INSERT INTO posts (user_id, text, sport_id, event_id, likes, comments) VALUES (?, ?, ?, ?, ?, ?)",
                       (user_id, text, sport_id, event_id, likes, comments))

    conn.commit()
    print("Mock data generation complete.")

# Generate 5000 mock posts
generate_mock_data(5000)

# Close database connection
conn.close()
