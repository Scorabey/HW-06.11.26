import {Person} from "../person/person.entity.js";
import type {PersonInt} from "../person/person.interface.js";
import type {Grade} from "../global/global.interface.js";

export class Student extends Person {
    private _grades: Grade[] = []

    constructor(
        person: PersonInt,
        public readonly studentCardNumber: string,
    ) {
        super(person);
    }

    get grades(): Grade[] {
        return this._grades;
    }

    set grades(grade: Grade) {
        if(grade.score < 0 || grade.score > 100) {
            throw new TypeError("The score should be in the range from 0 to 100.");
        }
        this._grades.push(grade);
    }

    public calculateGPA(): number {
        if(this._grades.length === 0) return 0;
        const total = this._grades.reduce((acc, curr) => acc + curr.score, 0);
        return Number((total / this._grades.length).toFixed(2));
    }

    override getRoleDescription(): string {
        return `Student: ${this.fullName} Card: ${this.studentCardNumber}, average score: ${this.calculateGPA()}`;
    }
}