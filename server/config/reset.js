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

const createDestinationsTable = async () => {
    const createDestinationsTableQuery = `
        DROP TABLE IF EXISTS destinations;

        CREATE TABLE IF NOT EXISTS destinations (
            id SERIAL PRIMARY KEY,
            destination VARCHAR(500) NOT NULL,
            description VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            img_url TEXT NOT NULL,
            flag_img_url TEXT NOT NULL
        )
    `

    try {
        const res = await pool.query(createDestinationsTableQuery)
        console.log('🎉 destinations table created successfully!')
    } catch (err) {
        console.error(`⚠️ Error creating destinations table \n${err}`)
    }
}

const createActivitiesTable = async () => {
    const createActivitiesTableQuery = `
        DROP TABLE IF EXISTS activities;

        CREATE TABLE IF NOT EXISTS destinations (
            id SERIAL PRIMARY KEY,
            trip_id INT NOT NULL,
            activity VARCHAR(100) NOT NULL,
            num_votes INT DEFAULT 0,
            FOREIGN KEY (trip_id) REFERENCES trips(id)
        )
    `

    try {
        const res = await pool.query(createActivitiesTableQuery)
        console.log('🎉 activities table created successfully!')
    } catch (err) {
        console.error(`⚠️ Error creating destinations table \n${err}`)
    }

}

const createTripsDestinationTable = async () => {
    const createTripsDestinationTableQuery = `
        DROP TABLE IF EXISTS trips_destinations;

        CREATE TABLE IF NOT EXISTS trips_destinations(
            trip_id INT PRIMARY KEY,
            destination_id INT PRIMARY KEY
            FOREIGN KEY trip_id REFERENCES trips(id)
            FOREIGN KEY destination_id REFERENCES destinations(id)
        )
    `

    try {
        const res = await pool.query(createTripsDestinationTableQuery)
        console.log('🎉 activities table created successfully!')
    } catch (err) {

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
createDestinationsTable()
createActivitiesTable()