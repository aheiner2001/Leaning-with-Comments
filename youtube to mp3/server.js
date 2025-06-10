const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname)); // Serve index.html

const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

app.post('/download', (req, res) => {
  const url = req.body.url;
  const fileId = Date.now();
  const outputPath = path.join(TEMP_DIR, `${fileId}.mp3`);

  const cmd = `yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}"`;

  exec(cmd, (err) => {
    if (err) {
      console.error('Download error:', err);
      return res.status(500).send('Failed to download');
    }

    res.download(outputPath, 'video.mp3', () => {
      fs.unlinkSync(outputPath); // delete after sending
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
