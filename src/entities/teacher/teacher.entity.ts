import {Person} from "../person/person.entity.js";
import type {PersonInt} from "../person/person.interface.js";
import type {AcademicTitle} from "../global/global.interface.js";

export interface TeacherInt {
    person: PersonInt;
    academicTitle: AcademicTitle;
    baseSalary: number;
}

export abstract class Teacher extends Person {
    constructor(
        person: PersonInt,
        public readonly academicTitle: AcademicTitle,
        protected baseSalary: number,
    ) {
        super(person);
    }

    public abstract calculateSalary(): number;
}