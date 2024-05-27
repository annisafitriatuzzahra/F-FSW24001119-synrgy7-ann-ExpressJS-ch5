import { Request, Response } from 'express';
//knex
import { CarsModel } from '../../../models/cars';
//endknex
import {UploadApiResponse, UploadApiErrorResponse} from 'cloudinary';
import cloudinary from '../../middleware/cloudinary';
import fs from 'fs';
import path from 'path';

//knex
async function getCars(req:Request, res:Response){
    const { q } = req.query

    if(!q) {
        const cars = await CarsModel.query();
        return res.status(200).json(cars)
    }

    const cars = await CarsModel
        .query()
        .whereLike('name', `%${q}%`)
        .orWhereLike('id', `%${q}%`)

    return res.status(200).json(cars)
}
//knexend

async function getCarById(req:Request, res:Response){
    const { id } = req.params

    try{
        const cars = await CarsModel.query().findById(id).throwIfNotFound();
        return res.status(200).json(cars)
    } catch(e) {
        return res.status(404).send("Data tidak ditemukan!")
    }
    
}

async function addCar(req: Request, res: Response) {
    if (!req.body) {
        return res.status(400).send("Invalid Request");
    }

    const filePath = req.file?.path;
    if (!filePath) {
        return res.status(400).send("File not found");
    }

    const file = `data:${req.file?.mimetype};base64,${fs.readFileSync(filePath).toString('base64')}`;

    cloudinary.uploader.upload(file, async function (err: UploadApiErrorResponse, result: UploadApiResponse) {
        if (err) {
            console.log(err);
            return res.status(400).send("Gagal upload file");
        }

        const { start_rent, finish_rent, ...otherData } = req.body;

        const validStartRent = start_rent ? new Date(start_rent) : null;
        const validFinishRent = finish_rent ? new Date(finish_rent) : null;

        // Ensure the dates are valid
        const isValidDate = (date: Date) => !isNaN(date.getTime());
        const startRentDate = validStartRent && isValidDate(validStartRent) ? validStartRent : null;
        const finishRentDate = validFinishRent && isValidDate(validFinishRent) ? validFinishRent : null;

        try {
            const cars = await CarsModel.query().insert({
                ...otherData,
                pict: result.url,
                created_at: new Date(), // Automatically set current date and time
                start_rent: startRentDate,
                finish_rent: finishRentDate
            }).returning('*');

            return res.status(201).json(cars);
        } catch (insertError) {
            console.error(insertError);
            return res.status(500).send("Gagal menyimpan data");
        }
    });
}

async function deleteCar(req:Request, res:Response){
    const { id } = req.params

    try{
        const cars = await CarsModel.query().deleteById(id).throwIfNotFound();
        return res.status(200).send("Data berhasil di hapus")

    } catch(e) {
        return res.status(404).send("Data tidak ditemukan!")
    }
}

async function updateCar(req: Request, res: Response) {
    const { id } = req.params;

    if (!req.file) {
        try {
            const cars = await CarsModel.query()
                .where({ id })
                .patch(req.body)
                .throwIfNotFound()
                .returning("*");

            return res.status(200).json(cars);
        } catch (e) {
            return res.status(404).send("Data tidak ditemukan!");
        }
    }

    const filePath = req.file.path;
    const file = `data:${req.file.mimetype};base64,${fs.readFileSync(filePath).toString('base64')}`;

    cloudinary.uploader.upload(file, async function (err: UploadApiErrorResponse, result: UploadApiResponse) {
        if (err) {
            console.log(err);
            return res.status(400).send("Gagal upload file");
        }

        try {
            const cars = await CarsModel.query()
                .where({ id })
                .patch({
                    ...req.body,
                    pict: result.url
                })
                .throwIfNotFound()
                .returning("*");

            return res.status(200).json(cars);
        } catch (e) {
            return res.status(404).send("Data tidak ditemukan!");
        }
    });
}

export {
    getCars,
    getCarById,
    addCar,
    deleteCar,
    updateCar
}