export class UserName {
    value: string;

    constructor(value: string) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid() {
        if (this.value.length < 3) {
            throw new Error("El nombre de usuario no debe tener menos de 3 caraceres");
        }
        if (this.value.length > 255) {
            throw new Error("El nombre de usuario no debe tener más de 255 caracteres");
        }
    }
}