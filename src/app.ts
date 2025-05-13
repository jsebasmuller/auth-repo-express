import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
// Importar los módulos necesarios.
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { UserRouter } from './lib/User/infrastructure/UserRouter';

// Crear una instancia de la aplicación Express.
const app = express();

app.use(cors());
// Middleware para parsear el cuerpo de las peticiones como JSON.
app.use(bodyParser.json());

// Usar las rutas de autenticación.
app.use('/api/auth', UserRouter);
app.use(
  ((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
      console.error(err.stack);
      res.status(500).json({message: err.message});
    }
    console.error(err);
    res.status(500).json({message: 'Algo salio mal'});
  }) as ErrorRequestHandler
);

export { app };
