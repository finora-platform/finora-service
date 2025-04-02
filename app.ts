import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { sebiListRouter } from './api/routes/sebi-list.routes';
import { appConfig } from './config/app.config';
import 'source-map-support/register';

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    // Routes
    app.use('/api/sebi-list', sebiListRouter);
  }

  private initializeSwagger(): void {
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
    );
  }

  public listen(): void {
    this.app.listen(appConfig.port, () => {
      console.log(`Server is running on port ${appConfig.port}`);
    });
  }
}

const app = new App();
app.listen();
