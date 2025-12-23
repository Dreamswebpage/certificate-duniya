const { Client } = require("pg");

exports.handler = async () => {
  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();
    const res = await client.query(
      "SELECT id, title, provider, type FROM certificates ORDER BY id DESC"
    );
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify(res.rows)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify([])
    };
  }
};
