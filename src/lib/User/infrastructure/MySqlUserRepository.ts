import * as bcrypt from 'bcrypt';
import { createPool, FieldPacket, Pool, RowDataPacket } from "mysql2/promise";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { generateToken } from '../../shared/infraestructure/GenerateToken';
import { ResponseLogin } from '../domain/response/ResponseLogin';

export class MySqlUserRepository implements UserRepository {
  client: Pool;

  constructor(host: string, user: string, password: string, database: string){
    this.client = createPool({
      host: host,
      user: user,
      password: password,
      database: database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  async create(user: User): Promise<ResponseLogin> {
    let response = {} as ResponseLogin;
    try {
      let userPrimitive = user.mapToPrimitives();
      // Verificar si el correo electronico ya existe.
      const [rows]: [RowDataPacket[], FieldPacket[]] = await this.client.query("SELECT COUNT(*) FROM USUARIOS WHERE EMAIL = ?", [userPrimitive.email.toLowerCase()]);
      if(rows.length === 1){
        if(rows[0]["COUNT(*)"] > 0){
          response.error = 'El correo electrónico ya se encuentra registrado.';
          return response;
        }
      }
      const hashPass = await bcrypt.hash(userPrimitive.password, 10);
      await this.client.query(
        "INSERT INTO USUARIOS (NOMBRE, EMAIL, TELEFONO, PASSWORD) VALUES (?, ?, ?, ?)",
        [userPrimitive.username, userPrimitive.email, userPrimitive.phone, hashPass]
      );
      response.message = 'Usuario registrado exitosamente';
      return response
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      response.error = 'Error interno del servidor al registrar usuario';
      return response;
    }
  }
  
  async login(user: User): Promise<ResponseLogin> {
    let response = {} as ResponseLogin;
    try {  
      let userPrimitive = user.mapToPrimitives();
      const [rows]: [RowDataPacket[], FieldPacket[]] = await this.client.query("SELECT * FROM USUARIOS WHERE EMAIL = ?", [userPrimitive.email.toLowerCase()]);
      if(rows.length === 1){
        const user = rows[0];
        const passwordDB = user.password;
        const confirmPass = await bcrypt.compare(userPrimitive.password, passwordDB)
        if(confirmPass){
          const token = generateToken({id: user.id, username: user.email});
          response.token = token;
          response.message = 'Autenticación satisfactoria';
          return response;
        }else{
          response.error = 'Error en la autenticación: credenciales inválidas.';
          return response;
        }
      }else{
        response.error = 'Usuario no se encuentra registrado';
        return response;
      }
    } catch (error) {
      response.error = 'Error interno del servidor al iniciar sesión.';
      console.error('Error al iniciar sesión:', error);
      return response;
    }
  }
}
