import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API artosq!' });
});

const modulesDir = path.join(__dirname, 'modules');

fs.readdirSync(modulesDir).forEach((module) => {
  const controllersDir = path.join(modulesDir, module, 'controllers');
  if (!fs.existsSync(controllersDir)) return;

  fs.readdirSync(controllersDir).forEach((file) => {
    if (!file.match(/\.(ts|js)$/)) return;

    const controllerPath = path.join(controllersDir, file);
    const controller = require(controllerPath);

    if (controller?.default) {
      app.use(`/${module}`, controller.default);
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} does not exist`,
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});