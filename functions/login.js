const { Client } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    const result = await client.query(
      "SELECT id, email, password FROM admins WHERE email=$1",
      [email]
    );

    await client.end();

    if (result.rows.length === 0) {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: "Invalid credentials" })
      };
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: "Invalid credentials" })
      };
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, token })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Server error" })
    };
  }
};
