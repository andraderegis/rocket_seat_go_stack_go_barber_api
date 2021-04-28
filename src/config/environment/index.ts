import path from 'path';

import dotEnvSafe from 'dotenv-safe';

dotEnvSafe.config({
  allowEmptyValues: true,
  path: path.resolve(
    process.env.NODE_ENV
      ? path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
      : path.resolve(process.cwd(), '.env')
  ),
  example: path.resolve(process.cwd(), '.env.example')
});
