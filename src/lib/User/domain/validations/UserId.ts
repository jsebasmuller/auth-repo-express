export class UserId {
    value: number;

    constructor(value: number) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid() {
        if (this.value > 1) {
            throw new Error("UserId debe ser mayor a 1");
        }
    }
}