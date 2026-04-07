import { pool } from "../config/database.js";

const createActivity = async(req, res) => {
    try {

        const trip_id = parseInt(req.params.trip_id)
        const {activity, num_votes} = req.body

        const insertQuery = `
            INSERT INTO activities (trip_id, activity, num_votes)
            VALUES ($1, $2, $3)
            RETURNING *
        `

        const results = await pool.query(insertQuery, [trip_id, activity, num_votes])
        res.status(200).json(results.rows[0])

    } catch (err) {
        res.status(409).json({error: err.message})
    }
}

const getActivities = async(req, res) => {
    try {
        const getQuery = `
            SELECT * FROM activities
            ORDER BY id ASC
        `
        
        const results = await pool.query(getQuery)
        res.status(201).json(results.rows)
    } catch (err) {
        res.status(409).json({error: err.message})
    }
}

const getTripActivites = async(req, res) => {
    try {
        const trip_id = parseInt(req.params.trip_id)
        const getQuery = `
            SELECT * FROM activities
            WHERE trip_id=$1
            ORDER BY id ASC
        `
        const results = await pool.query(getQuery, [trip_id])
        res.status(201).json(results.rows)

    } catch (err) {
        res.status(409).json({error: err.message})
    }
}

const updateActivityLikes = async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const updateQuery = `
            UPDATE activities
            SET 
                num_votes = num_votes + 1
            WHERE ID = $1
            RETURNING *
            
        `
        const results = await pool.query(updateQuery, [id])
        res.status(201).json(results.rows[0])

    } catch (err) {
        res.status(409).json({error: err.message})
    }
}

const deleteActivity = async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const deleteQuery = `
            DELETE FROM activities 
            WHERE id=$1
            RETURNING *
        `
        
        const results = await pool.query(deleteQuery, [id])
        res.status(200).json(results.rows[0])
    } catch (err) {
        res.status(409).json({error: err.message})
    }
}

export default {
    createActivity, 
    getActivities,
    getTripActivites,
    updateActivityLikes,
    deleteActivity
}