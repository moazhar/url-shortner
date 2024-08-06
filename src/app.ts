import dotenv from 'dotenv';
import path from 'path';

const environment = process.env.NODE_ENV;
const envFilePath = path.resolve(
  __dirname,
  `../environment/.env.${environment}`
);

dotenv.config({ path: envFilePath });

import ServerUtility from './utils/server.utils';
import DatabaseUtility from './utils/database.utils';

const serverUtility = ServerUtility.getInstance();
const databaseUtility = DatabaseUtility.getInstance();

async function main() {
  // Connect to Database
  await databaseUtility.connect();

  // Start the server
  await serverUtility.start();
}

main();
