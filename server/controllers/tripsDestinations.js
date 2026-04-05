import { pool } from "../config/database.js";

const createTripDestination = async(req, res) => {
    try {
        const {trip_id, destination_id} = req.body
        const insertQuery = `
            INSERT INTO trips_destinations (trip_id, destination_id)
            VALUES ($1, $2)
            RETURNING *
        `

        const results = await pool.query(insertQuery, [trip_id, destination_id])
        res.status(201).json(results.rows[0])

    } catch(err) {
        res.status(409).json({error: err.message})
    }
}

const getTripsDestinations = async(req, res) => {
    try {
        const getQuery = `
            SELECT * FROM trips_destinations
            ORDER BY trip_id ASC, destination_id ASC
        `

        const results = await pool.query(getQuery)
        res.status(201).json(results.rows)

    } catch(err) {
        res.status(409).json({error: err.message})
    }
}

const getAllTrips = async(req, res) => {
    try {
        const destination_id = req.params.destination_id
        const getQuery = `
            SELECT t.*
            FROM trips_destinations td
            JOIN trips t
            ON td.trip_id = t.id
            WHERE td.destination_id = $1
        `

        const results = await pool.query(getQuery, [destination_id])
        res.status(201).json(results.rows)

    } catch(err) {
        res.status(409).json({error: err.message})
    }
}

const getAllDestinations = async(req, res) => {
    try {
        const trip_id = req.params.trip_id
        const getQuery = `
            SELECT d.*
            FROM trips_destinations td
            JOIN destinations d
            ON td.destination_id = d.id
            WHERE td.trip_id = $1
        `

        const results = await pool.query(getQuery, [trip_id])
        res.status(200).json(results.rows)

    } catch(err) {
        res.status(409).json({error: err.message})
    }
}

export default {
    createTripDestination,
    getTripsDestinations,
    getAllTrips,
    getAllDestinations
}