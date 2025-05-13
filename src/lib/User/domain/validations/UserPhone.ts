export class UserPhone {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    let pattern = /^[0-9]+$/;
    if (!pattern.test(this.value)) {
      throw new Error("El teléfono solo debe tener números");
    }
    if (this.value.length > 10) {
      throw new Error("El teléfono no debe tener más de 10 caracteres");
    }
    if (this.value.length < 7){
      throw new Error("El teléfono no debe tener menos de 7 caracteres");
    }
  }
}