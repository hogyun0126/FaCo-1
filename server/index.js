require("dotenv").config();
const app = require("./app.js");

const PORT = process.env.HTTP_PORT || 80;

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});