import type {Identifiable} from "../global/global.interface.js";

export interface IRepository<T extends Identifiable> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | undefined>;
    findWhere(predicate: (entity: T) => boolean): Promise<T[]>;
    save(entity: T): Promise<void>;
    delete(id: string): Promise<boolean>;
}