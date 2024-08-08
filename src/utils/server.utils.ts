import express, {
  type Request,
  type Response,
  type Application,
  NextFunction,
} from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import env from '../../env';
import ErrorHandler from '../middleware/error-handler.middleware';
import routes from '../route/index';

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
    const viewsPath = path.resolve(__dirname, '../view');

    // HTTP request logger
    this.app.use(logger(logFormat));

    // JSON body parser
    this.app.use(express.json());

    // Parse URL-encoded bodies (as sent by HTML forms)
    this.app.use(express.urlencoded({ extended: false }));

    // Parse cookies
    this.app.use(cookieParser());

    // Protection against vulnerabilities and attacks
    this.app.use(helmet());

    // Cross Origin Resource Sharing
    this.app.use(cors());

    // Set view engine
    this.app.set('view engine', 'ejs');

    // Set path to views
    this.app.set('views', viewsPath);

    // Server health check
    this.app.use('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'Ok',
      });
    });

    // Lowercase emails before processing
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.body && req.body.email) {
        req.body.email = req.body.email.toLowerCase();
      }
      next();
    });

    /** Define routes here */
    this.app.use('/api/v1', routes);

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
