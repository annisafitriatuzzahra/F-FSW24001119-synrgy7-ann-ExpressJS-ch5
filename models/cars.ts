import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
    id!: number;
    name!: string;
    pict!: string;
    price!: number;
    start_rent!: Date;
    finish_rent!: Date;
    created_at!: Date;

    static get tableName(){
        return "cars"
    }
}

export type Books = ModelObject<CarsModel>;