import * as bcrypt from 'bcrypt';
import { createPool, FieldPacket, Pool, RowDataPacket } from "mysql2/promise";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { generateToken } from '../../shared/infraestructure/GenerateToken';
import { ResponseLogin } from '../domain/response/ResponseLogin';
import { UserId } from '../domain/validations/UserId';
import { UserPassword } from '../domain/validations/UserPassword';
import { UserPhone } from '../domain/validations/UserPhone';
import { UserEmail } from '../domain/validations/UserEmail';
import { UserName } from '../domain/validations/UserName';

type MySqlUser = {
  id: number,
  nombre: string,
  email: string,
  telefono: string,
  password: string  
};

export class MySqlUserRepository implements UserRepository {
  client: Pool;

  constructor(host: string, user: string, password: string, database: string, port: number){
    this.client = createPool({
      host: host,
      user: user,
      password: password,
      database: database,
      port: port,
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
      const [rows]: [RowDataPacket[], FieldPacket[]] = await this.client.query("select count(*) from usuarios where email = ?", [userPrimitive.email.toLowerCase()]);
      if(rows.length === 1){
        if(rows[0]["count(*)"] > 0){
          response.error = 'El correo electrónico ya se encuentra registrado.';
          return response;
        }
      }
      const hashPass = await bcrypt.hash(userPrimitive.password, 10);
      await this.client.query(
        "insert into usuarios (nombre, email, telefono, password) values (?, ?, ?, ?)",
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
      const [rows]: [RowDataPacket[], FieldPacket[]] = await this.client.query("select * from usuarios where email = ?", [userPrimitive.email.toLowerCase()]);
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

  async get(id: UserId): Promise<User | null> {
    try {  
      const [rows]: [RowDataPacket[], FieldPacket[]] = await this.client.query("select * from usuarios where id = ?", [id.value]);
      if(rows.length === 1){
        const user = rows[0] as MySqlUser;
        return this.mapToDomain(user);
      }else{
        return null
      }
    } catch (error) {
      console.error('Error al recuperar el usuario:', error);
      return null;
    }
  }

  private mapToDomain(user: MySqlUser): User {
    return new User(
      new UserId(user.id),
      new UserName(user.nombre),
      new UserEmail(user.email),
      new UserPhone(user.telefono),
      new UserPassword(user.password)
    );
  }
}
