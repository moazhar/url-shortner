import dotenv from 'dotenv';

dotenv.config({});

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
