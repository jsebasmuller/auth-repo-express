import { app } from './app';
// Importar los módulos necesarios.

// Iniciar el servidor y hacer que escuche en el puerto definido.
app.listen(3600, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:3600`);
});