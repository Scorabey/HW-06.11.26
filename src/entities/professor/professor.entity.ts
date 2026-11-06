import {Teacher} from "../teacher/teacher.entity.js";
import type {PersonInt} from "../person/person.interface.js";

export class Professor extends Teacher {
    constructor(
        person: PersonInt,
        baseSalary: number,
    ) {
        super(person, "Professor", baseSalary);
    }

    override calculateSalary(): number {
        return this.baseSalary * 1.5;
    }

    override getRoleDescription(): string {
        return `Professor of the department: ${this.fullName}`;
    }
}