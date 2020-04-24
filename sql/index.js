import path from 'path';
import fs from 'fs';

const readSql = (filePath) => {
    return fs.readFileSync(path.resolve(filePath)).
}

export default {
  up: {
    '20200422210030-user': () => fs.readFileSync(path.resolve('./migrations/20200422210030-user/up.sql')),
  },
  down: {
    '20200422210030-user': () => fs.readFileSync(path.resolve('./migrations/20200422210030-user/..')),
  },
};
