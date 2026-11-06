import type {Identifiable} from "../global/global.interface.js";
import {Teacher} from "../teacher/teacher.entity.js";
import crypto from "node:crypto";

export class Course implements Identifiable {
    public readonly id: string = crypto.randomUUID();

    constructor(
        public title: string,
        public credits: number,
        private readonly _instructor: Teacher,
    ) {}

    get instructor(): Teacher {
        return this._instructor;
    }

    set instructor(newInstructor: Teacher) {
        console.log(`[Course info] Instructor has been changed, new instructor: ${newInstructor}`);
        this.instructor = newInstructor;
    }
}