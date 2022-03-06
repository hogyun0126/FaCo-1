require("dotenv").config();
const app = require("./app.js");

const multer  = require('multer');

const upload = multer({ 
  dest:'uploads/', // 이미지 업로드 경로
});
app.post('/up', upload.single('file'), (req, res) => {
  console.log(req.file);
});

const PORT = process.env.HTTP_PORT || 80;

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});