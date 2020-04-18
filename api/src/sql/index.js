import { QueryFile } from 'pg-promise';
import path from 'path';

const sql = (file) => {
  const fullPath = path.join(__dirname, file); // generating full path;
  return new QueryFile(fullPath, { minify: true });
};

export default {
  sql,
};
