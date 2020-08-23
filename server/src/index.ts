/**
 * Required External Modules
 */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import upload from "./upload";

/**
 * App Variables
 */
const app = express();
const PORT: number = 7000;

/**
 *  App Configuration
 */
// allow any domain
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.post("/upload", upload);

/**
 * Server Activation
 */
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}  `);
});

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
