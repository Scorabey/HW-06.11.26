import {Teacher} from "../teacher/teacher.entity.js";
import type {PersonInt} from "../person/person.interface.js";

export class AssociateProfessor extends Teacher {
    constructor(
        person: PersonInt,
        baseSalary: number,
    ) {
        super(person, "AssociateProfessor", baseSalary);
    }

    override calculateSalary(): number {
        return this.baseSalary * 1.25;
    }

    override getRoleDescription(): string {
        return `Associate professor of the department: ${this.fullName}`;
    }
}