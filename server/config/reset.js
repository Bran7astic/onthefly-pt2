import './dotenv.js'
import {pool} from './database.js'
import { fileURLToPath } from 'url'
import path, {dirname} from 'path'
import fs from 'fs'

const currentPath = fileURLToPath(import.meta.url)
const tripsFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/data.json'))
const tripsData = JSON.parse(tripsFile)

const createTripsTable = async () => {
    const createTripsTableQuery = `
        DROP TABLE IF EXISTS trips;

        CREATE TABLE IF NOT EXISTS trips(
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description VARCHAR(500) NOT NULL,
            img_url TEXT NOT NULL,
            num_days INTEGER NOT NULL,   
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            total_cost MONEY NOT NULL
        )
    `

    try {
        const res = await pool.query(createTripsTableQuery)
        console.log('🎉 trips table created successfully!')
    } catch (err) {
        console.error(`⚠️ Error creating trips table \n${err}`)
    }
}

const seedTripsTable = async() => {
    await createTripsTable()

    tripsData.forEach(trip => {
        const insertQuery = `
            INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `

        const values = [
            trip.title,
            trip.description,
            trip.img_url,
            trip.num_days, 
            trip.start_date,
            trip.end_date,
            trip.total_cost
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error(`⚠️ error inserting trip: \n${err}`)
                return
            }

            console.log(`✅ ${trip.title} added successfully`)
        })
    })
}

seedTripsTable()