import express, {
  type Request,
  type Response,
  type Application,
} from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import env from '../../env';
import ErrorHandler from '../middleware/error-handler.middleware';

class ServerUtility {
  private static instance: ServerUtility;

  private readonly app: Application;

  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = Number(env.PORT);
    this.configureMiddleware();
  }

  public static getInstance(): ServerUtility {
    if (!ServerUtility.instance) {
      ServerUtility.instance = new ServerUtility();
    }

    return ServerUtility.instance;
  }

  public configureMiddleware(): void {
    const logFormat = env.NODE_ENV === 'production' ? 'combined' : 'dev';

    // HTTP request logger
    this.app.use(logger(logFormat));

    // JSON body parser
    this.app.use(express.json());

    // Protection against vulnerabilities and attacks
    this.app.use(helmet());

    // Cross Origin Resource Sharing
    this.app.use(cors());

    // Server health check
    this.app.use('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'Ok',
      });
    });

    /** Define routes here */

    // Global Error Middleware
    this.app.use(ErrorHandler);
  }

  public async start(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      try {
        this.app.listen(this.port, () => {
          console.log(`Server started on PORT: ${this.port}...🚀`);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default ServerUtility;
