const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'storage/' });

let version = 1;

app.use(express.static('storage'));

app.post('/upload', upload.single('mp4'), (req, res) => {
  const newFile = `storage/slideshow-v${version}.mp4`;

  fs.renameSync(req.file.path, newFile);

  version++;
  res.send("Upload successful");
});

app.get('/playlist.json', (req, res) => {
  res.json({
    playlistId: "canva-auto",
    version: version,
    videos: [
      {
        id: "main",
        url: `https://YOUR-SERVER-URL/storage/slideshow-v${version}.mp4`
      }
    ]
  });
});

app.listen(3000, () => console.log("Signage server running"));
