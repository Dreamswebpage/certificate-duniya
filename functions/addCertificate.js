const { Client } = require("pg");
const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  try {
    const token = event.headers.authorization?.split(" ")[1];

    if (!token) {
      return { statusCode: 401, body: "Unauthorized" };
    }

    jwt.verify(token, process.env.JWT_SECRET);

    const { title, provider, type } = JSON.parse(event.body);

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    await client.query(
      "INSERT INTO certificates (title, provider, type) VALUES ($1,$2,$3)",
      [title, provider, type]
    );

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false })
    };
  }
};
