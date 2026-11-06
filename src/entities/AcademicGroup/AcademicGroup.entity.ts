import type {Identifiable} from "../global/global.interface.js";
import crypto from "node:crypto";
import type {Student} from "../student/student.entity.js";
import type {Teacher} from "../teacher/teacher.entity.js";

export class AcademicGroup implements Identifiable {
    public readonly id: string = crypto.randomUUID();
    private _students: Map<string, Student> = new Map();

    constructor(
        public name: string,
        public curator?: Teacher,
    ) {}

    public getStudents() {
        return Array.from(this._students.values())
    }

    public addStudent(student: Student) {
        if(this._students.has(student.id)) {
            throw new Error(`Student ${student.fullName} already enrolled in the group: ${this.name}`);
        }
        this._students.set(student.id, student);
    }

    public removeStudent(studentId: string) {
        if(!this._students.has(studentId)) {
            throw new Error(`Student: ${studentId}, not found in group`)
        }
        this._students.delete(studentId);
    }

    public getGroupAverageScore(): number {
        const list = this.getStudents()
        if(list.length === 0) return 0;
        const totalGpa = list.reduce((acc, curr) => acc + curr.calculateGPA(), 0);
        return Number((totalGpa / list.length).toFixed(2));
    }
}