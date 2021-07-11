import {Knex} from "knex";

export abstract class Repository<T extends Readonly<T>> {
    protected abstract table: string;

    constructor(protected knex: Knex) {
    }

    protected queryKnex() {
        return this.knex<T>(this.table);
    }

    async findAll() {
        return this.queryKnex().select();
    }

    async add(flats: T | T[]) {
        return this.queryKnex().insert(flats);
    }
}
