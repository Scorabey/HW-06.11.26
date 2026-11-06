import type { PersonInt} from "./person.interface.js";
import { UnexpectedError } from "../global/global.entity.js";
import type {Identifiable, Name} from "../global/global.interface.js";
import crypto from 'node:crypto'

export abstract class Person implements PersonInt, Identifiable {
    public readonly id: string = crypto.randomUUID()

    constructor(
        protected readonly person: PersonInt
    ) {}

    get name() {
       return this.person.name;
    }

    set name(name: Name) {
        this.person.name.firstName = this.capitalize(name.firstName.trim());
        this.person.name.lastName = this.capitalize(name.lastName.trim());
        if(name.middleName) this.person.name.middleName = this.capitalize(name.middleName.trim());
    }

    get age() {
        return this.person.age;
    }

    set age(age: number) {
        if(age <= 0) throw new UnexpectedError("Age must be greater than 0");

        this.person.age = age;
    }

    get email() {
        return this.person.email;
    }

    set email(value: string) {
        if (!value.includes("@") || !value.includes(".")) {
            throw new UnexpectedError(`Invalid email: ${value}`);
        }
        this.person.email = value;
    }

    get fullName(): string {
        const { lastName, firstName, middleName } = this.name;
        const initials = [firstName, middleName]
            .map((n) => n?.trim().charAt(0))
            .filter(Boolean)
            .map((c) => `${c}.`)
            .join(' ');

        return `${lastName} ${initials}`.trim();
    }

    information(): string {
        return `Full name: ${this.fullName}\nage: ${this.age}\nemail: ${this.person.email}`
    }

    abstract getRoleDescription(): string;

    private capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}