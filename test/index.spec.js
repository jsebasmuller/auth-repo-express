import request from 'supertest';
import app from '../app';

describe('Auth Endpoints', () => {
    test('Deberia registrar un nuevo usuario', async () => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            phone: '123541',
            password: 'password123'
        };
        const res = await request(app)
            .post('/api/auth/register')
            .send(userData)
            .expect(201); // Esperamos un código de estado 201 (Created)
        expect(res.body).toHaveProperty('message', 'Usuario registrado exitosamente'); // Esperamos el mensaje de registro exitoso
    });

    it('Deberia logear un usuario existente', async () => {
        // Primero, asegurarnos de que el usuario 'pauchacon16@gmail.com' exista en la base de datos
        const loginData = {
            email: 'pauchacon16@gmail.com',
            password: '12345'
        };
        const res = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .expect(200); // Esperamos un código de estado 200 (OK)
        expect(res.body).toHaveProperty('token'); // Esperamos recibir un token de autenticación
        expect(res.body).toHaveProperty('message', 'Autenticación satisfactoria'); // Deberiamos recibir el mensaje de autenticación existosa
    });

    it('Deberia fallar con contraseña incorrecta', async () => {
        const loginData = {
            email: 'pauchacon16@gmail.com',
            password: 'contraseñaIncorrecta'
        };
        await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .expect(401); // Esperamos un código de estado 401 (Unauthorized)
    });
});