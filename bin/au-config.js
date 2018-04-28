#!/usr/bin/env node
const fs = require('fs'),
  path = require('path');

const createSassConfig = () => {
  const source = fs.createReadStream(path.resolve(__dirname, '../sass/_config.scss')),
    dest = fs.createWriteStream(path.resolve(process.cwd(), '_config.scss'));

  source.pipe(dest);
  source.on('end', () => {
    console.log(`You're all set!`); // eslint-disable-line no-console
  });
  source.on('error', err => {
    console.log(err); // eslint-disable-line no-console
  });
};

createSassConfig();
