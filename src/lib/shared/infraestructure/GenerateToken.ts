import jwt from "jsonwebtoken";

// Define una interfaz para la estructura del objeto 'user' que se usará para generar el token.
// Ajusta los tipos (number | string) según cómo sean realmente en tu base de datos o modelo.
interface UserPayload {
  id: number | string; // O solo number, o solo string, dependiendo de tu ID de usuario
  username: string; // O email, dependiendo de qué propiedad uses aquí
  // Puedes añadir otras propiedades si las incluyes en el payload del token
}

// Tipifica el parámetro 'user' con la interfaz UserPayload.
export const generateToken = (user: UserPayload): string => {
  // jwt.sign() retorna un string (el token JWT)
  // 'SECRET_KEY' debe ser una clave secreta fuerte y almacenada de forma segura (por ejemplo, en variables de entorno).
  // Evita usar 'SECRET_KEY' directamente en el código fuente en producción.
  return jwt.sign(user, 'SECRET_KEY', { expiresIn: '8h' }); // El token expira en 8 horas
};
