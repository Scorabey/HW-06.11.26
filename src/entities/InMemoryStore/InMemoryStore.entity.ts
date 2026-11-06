import type {Identifiable} from "../global/global.interface.js";
import type {IRepository} from "./InMemoryStore.interface.js";
import {NotFoundException} from "../global/global.entity.js";

export class InMemoryStore<T extends Identifiable> implements IRepository<T> {
    private _items: Map<string, T> = new Map();

    async findAll(): Promise<T[]> {
        return Array.from(this._items.values());
    }

    async findById(id: string): Promise<T | undefined> {
        const item = this._items.get(id);
        if (!item) {
            throw new NotFoundException(`Item with id ${id} not found`);
        }
        return item;
    }

    async findWhere(predicate: (entity: T) => boolean): Promise<T[]> {
        return [...this._items.values()].filter(predicate);
    }

    async save(entity: T): Promise<void> {
        this._items.set(entity.id, entity);
    }

    async delete(id: string): Promise<boolean> {
        if(!this._items.has(id)) {
            throw new NotFoundException(`Item with id ${id} not found`);
        }
        return this._items.delete(id);
    }
}