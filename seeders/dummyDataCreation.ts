import { faker } from '@faker-js/faker';
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'leagueX'
});

function generateMockData(numPosts: number): void {

    const sports = ["Football", "Basketball", "Tennis", "Soccer", "Baseball"];
    const users = Array.from({ length: 50 }, () => faker.internet.userName());
    const posts: Array<[number, string, number, number, number, number]> = [];

    for (let i = 0; i < numPosts; i++) {
        const userId = Math.floor(Math.random() * users.length) + 1;
        const text = faker.lorem.paragraph(Math.floor(Math.random() * 3) + 1);
        const sportId = Math.floor(Math.random() * sports.length) + 1;
        const eventId = Math.floor(Math.random() * 3) + 1;
        const likes = Math.floor(Math.random() * 101);
        const comments = Math.floor(Math.random() * 51);
        posts.push([userId, text, sportId, eventId, likes, comments]);
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL database:', err);
            return;
        }

        connection.query("INSERT INTO sports (name) VALUES ?", [sports.map(sport => [sport])], (err) => {
            if (err) {
                console.error('Error inserting sports:', err);
                return;
            }

            connection.query("INSERT INTO users (username) VALUES ?", [users.map(user => [user])], (err) => {
                if (err) {
                    console.error('Error inserting users:', err);
                    return;
                }

                connection.query("INSERT INTO posts (user_id, text, sport_id, event_id, likes, comments) VALUES ?", [posts], (err) => {
                    if (err) {
                        console.error('Error inserting posts:', err);
                        return;
                    }

                    console.log("Mock data generation complete.");
                    connection.release();
                });
            });
        });
    });
}

generateMockData(5000);