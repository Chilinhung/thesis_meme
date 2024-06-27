const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/ig_images", async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  const response = await fetch(
    "https://github.com/Chilinhung/ig_data/main/image_set.json"
  );
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => {
  console.log("CORS-enabled web server listening on port 3000");
});
