export class UserEmail {
  value: string;

  constructor(value: string) {
      this.value = value;
      this.ensureIsValid();
  }

  private ensureIsValid() {
    let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!pattern.test(this.value)) {
          throw new Error("El email no es válido");
      }
      if (this.value.length > 255) {
          throw new Error("El email de usuario no debe tener más de 255 caracteres");
      }
  }
}