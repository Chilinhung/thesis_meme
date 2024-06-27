const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// tackle root URL GET requests
app.get("/", (req, res) => {
  res.send("Welcome to the Meme Survey App!");
});

const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Heroku 會自動設置此環境變量
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          //在 Heroku 上通常需要啟用ssl
          rejectUnauthorized: false,
        }
      : false,
});

app.post("/submit", async (req, res) => {
  const responses = req.body.responses; // 获取前端发送的 responses 数组
  try {
    for (const response of responses) {
      const { questionId, aspect, value } = response;
      await saveResponse(questionId, aspect, value);
    }
    res.send({ status: "success", message: "All responses saved!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "error", message: "Error saving responses" });
  }
});

async function saveResponse(questionId, aspect, value) {
  try {
    const query =
      "INSERT INTO survey_results(question_id, aspect, value) VALUES($1, $2, $3)";
    const result = await pool.query(query, [questionId, aspect, value]);
    return result;
  } catch (error) {
    console.error("Error saving response:", error);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
