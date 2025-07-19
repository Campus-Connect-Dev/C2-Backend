import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config, type ConfigType } from './config/environment';
import { apiRoutes } from './routes';
import { errorHandler, notFoundHandler } from './middleware';

export class App {
  private app: Application;
  private readonly configValues: ConfigType;

  constructor() {
    this.app = express();
    this.configValues = config;
    this.app.set('trust proxy', true);
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    
    const allowedOrigins = this.configValues['NODE_ENV'] === 'production' 
      ? [
          'https://c2-backend-dev--campus-connect-aab7a.europe-west4.hosted.app',
          'https://t-2758513072---c2-backend-dev-npy5oocw4q-ez.a.run.app',
          'https://campus-connect-aab7a.web.app',
          'https://campus-connect-aab7a.firebaseapp.com'
        ]
      : true;

    this.app.use(cors({
      origin: allowedOrigins,
      credentials: true
    }));
    
    this.app.use(compression());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    
    if (this.configValues['NODE_ENV'] === 'development') {
      this.app.use(morgan('dev'));
    } else {
      this.app.use(morgan('combined'));
    }
    
    // Configure rate limiter for Cloud Run environment
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
        timestamp: new Date().toISOString()
      },
      standardHeaders: true,
      legacyHeaders: false,
      skip: () => {
        // Skip rate limiting in development
        return this.configValues['NODE_ENV'] !== 'production';
      },
      keyGenerator: (req) => {
        // Use the last IP in X-Forwarded-For chain when in production (Cloud Run)
        // or the direct IP in development
        const forwarded = req.headers['x-forwarded-for'] as string | undefined;
        const ip = forwarded 
          ? forwarded.split(',').pop()?.trim() || req.ip
          : req.ip;
        return ip || 'unknown'; // Ensure we always return a string
      }
    });
    
    this.app.use(limiter);
  }

  private initializeRoutes(): void {
    this.app.use('/', apiRoutes);
  }

  private initializeErrorHandling(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public getApp(): Application {
    return this.app;
  }

  public listen(): void {
    const serverPort = process.env['PORT'] ? parseInt(process.env['PORT'], 10) : this.configValues['PORT'];
    
    this.app.listen(serverPort, () => {
      console.log(` Campus Connect Backend running on port ${serverPort}`);
      console.log(` Environment: ${this.configValues['NODE_ENV']}`);
      console.log(` Health check: http://localhost:${serverPort}/api/${this.configValues['API_VERSION']}/health`);
    });
  }
}
