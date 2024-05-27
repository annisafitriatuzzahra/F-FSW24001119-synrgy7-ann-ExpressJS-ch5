import express, { Express, Request, Response, NextFunction } from 'express';
import { getCars, getCarById, deleteCar, addCar, updateCar} 
from './server/api/car'
import path from 'path'
//knex
import knex from 'knex'
import { Model } from 'objection';
//endknex
import upload from './server/middleware/multer'
import uploadOnMemory from './server/middleware/multerMemory'

const app: Express = express();
//knex
const knexInstance = knex({
    client: "postgresql",
    connection: {
        database: "car_rental",
        user: "postgres",
        password: "puripermata",
        port: 5432
    }
})
const port = 5000;

Model.knex(knexInstance);
//endknex

//setup view engine
app.use("/public", express.static(path.resolve(__dirname, 'public')));
app.set('views', path.join(__dirname, './server/views'))
app.set('view engine', 'ejs')

app.use(express.json())

//middleware
// function isAdmin(req:Request, res:Response, next:NextFunction){
//     if(req.query.iam === "admin"){
//         next();
//         return
//     }

//     res.status(401).send("kamu bukan admin!")
// }

// app.get('/', (req: Request, res: Response) => {
//     res.render('index', {
//         name: req.query.name || 'Guest'
//     })
// })

// Rute utama untuk mengakses halaman utama
app.get('/', (req: Request, res: Response) => {
    res.render('index', {
        name: req.query.name || 'Guest'
    });
});

// listing all data (overview)
app.get("/api/v1/cars", getCars)
// get detail specific data by id
app.get("/api/v1/cars/:id", getCarById)
// add new data
app.post("/api/v1/cars", upload.single('pict'), addCar)
// update existing data using id 
app.put("/api/v1/cars/:id", uploadOnMemory.single("pict"), updateCar)
// delete existing data using id
app.delete("/api/v1/cars/:id", deleteCar)

app.listen(port, () => console.log(`app listen on http://localhost:${port}`))