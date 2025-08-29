require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB)
  .then(() => console.log("successfully connected to mongDB"));

app.listen(port, () => {
  console.log(`listen on port http://localhost:${port}`);
});
