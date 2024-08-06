import mongoose from 'mongoose';

import env from '../../env';

class DatabaseUtility {
  private static instance: DatabaseUtility;

  private readonly dbUri: string;

  constructor() {
    this.dbUri = env.DB_URI;
  }

  public static getInstance(): DatabaseUtility {
    if (!DatabaseUtility.instance) {
      DatabaseUtility.instance = new DatabaseUtility();
    }

    return DatabaseUtility.instance;
  }

  public async connect(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      try {
        mongoose.connect(this.dbUri).then(() => {
          console.log('Database connected.');
          resolve();
        });
      } catch (error) {
        console.error('Database connection error:', error);
        reject(error);
      }
    });
  }
}

export default DatabaseUtility;
