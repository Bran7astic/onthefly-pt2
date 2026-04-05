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
        DROP TABLE IF EXISTS trips CASCADE;

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
        DROP TABLE IF EXISTS destinations CASCADE;

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

        CREATE TABLE IF NOT EXISTS activities (
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

        CREATE TABLE IF NOT EXISTS trips_destinations (
            trip_id INT NOT NULL,
            destination_id INT NOT NULL,
            PRIMARY KEY (trip_id, destination_id),
            FOREIGN KEY (trip_id) REFERENCES trips(id),
            FOREIGN KEY (destination_id) REFERENCES destinations(id)
        )
    `

    try {
        const res = await pool.query(createTripsDestinationTableQuery)
        console.log('🎉 trips_destination table created successfully!')
    } catch (err) {
        console.error(`⚠️ error creating trips_destination table ${err}`)
    }
}

const createUserTables = async () => {
    const createUserTablesQuery = `
        DROP TABLE IF EXISTS users CASCADE;

        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            githubid INT NOT NULL,
            username VARCHAR(100) NOT NULL,
            avatarurl VARCHAR(500) NOT NULL,
            accesstoken VARCHAR(500) NOT NULL
        )
    `

    try {
        const res = pool.query(createUserTablesQuery)
        console.log('🎉 users table created successfully!')
    } catch(err) {
        console.error(`⚠️ error creating users table ${err}`)
    }
}

const createTripsUsersTable = async () => {
    const createTripsUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS trips_users (
            trip_id INT NOT NULL,
            user_id INT NOT NULL,
            PRIMARY KEY (trip_id, user_id),
            FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
        )
    `

    try {
        const res = pool.query(createTripsUsersTableQuery)
        console.log('🎉 trips_users table created successfully!')
    } catch(err) {
        console.error(`⚠️ error creating trips_user table ${err}`)
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

const main = async () => {
    await seedTripsTable()
    await createDestinationsTable()
    await createActivitiesTable()
    await createTripsDestinationTable()
    await createUserTables()
    await createTripsUsersTable()
}

main()