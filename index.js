#!/usr/bin/env node
const express = require('express');
const multer  = require('multer');
const program = require('commander');

program
  .option('-s, --storage <dir>', 'Storage dir')
  .option('-p, --port [port]', 'Port')
  .parse(process.argv);

const destination = program.storage;
const port = program.port || 8000;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, destination);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
const app = express();
 
app.post('/', upload.single('file'), (req, res) => res.end());
app.use('/', express.static(destination));

app.listen(port, () => console.log(`Listening on port ${port}!`));