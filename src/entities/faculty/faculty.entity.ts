import type {Identifiable} from "../global/global.interface.js";
import {AcademicGroup} from "../AcademicGroup/AcademicGroup.entity.js";
import crypto from "node:crypto";
import type {Teacher} from "../teacher/teacher.entity.js";
import {NotFoundException} from "../global/global.entity.js";

interface AcademicGroupInt extends AcademicGroup {}

export class Faculty implements Identifiable {
    private _groups: Map<string, AcademicGroup> = new Map();
    public readonly id: string = crypto.randomUUID();

    constructor(
        public name: string,
    ) {}

    public findAllGroups(): AcademicGroupInt[] {
        return Array.from(this._groups.values());
    }

    public createGroup(name: string, curator: Teacher): AcademicGroupInt {
        const newGroup = new AcademicGroup(name, curator);
        this._groups.set(newGroup.id, newGroup);
        return newGroup;
    }

    public deleteGroup(groupId: string) {
        this.checkGroupById(groupId);

        this._groups.delete(groupId);
    }

    public findGroupById(groupId: string): AcademicGroupInt | undefined {
        this.checkGroupById(groupId);

        return this._groups.get(groupId);
    }

    private checkGroupById(groupId: string) {
        if(!this._groups.has(groupId)) {
            throw new NotFoundException(`Group with id: ${groupId} not found`);
        }
    }
}