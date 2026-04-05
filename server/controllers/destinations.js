import { pool } from "../config/database.js";

const createDestination = async(req, res) => {
	try {
		const {destination, description, country, img_url, flag_img_url} = req.body
		const insertQuery = `
			INSERT INTO destinations (destination, description, country, img_url, flag_img_url)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING *
		`

		const results = await pool.query(insertQuery, [destination, description, country, img_url, flag_img_url])
		res.status(201).json(results.rows[0])

	} catch(err) {
		res.status(409).json({error: err.message})
	}
}

const getDestinations = async(req, res) => {
	try {
		const getQuery = `
			SELECT * FROM destinations
			ORDER BY id ASC
		`

		const results = await pool.query(getQuery)
		res.status(201).json(results.rows)

	} catch(err) {
		res.status(409).json({error: err.message})
	}
}

const getDestination = async(req, res) => {
	try {
		const id = parseInt(req.params.id)
		const getQuery = `
			SELECT * FROM destinations
			WHERE id = $1
		`

		const results = await pool.query(getQuery, [id])
		res.status(201).json(results.rows[0])

	} catch(err) {
		res.status(409).json({error: err.message})
	}
}

const updateDestination = async(req, res) => {
	try {
		const id = parseInt(req.params.id)
		const {destination, description, country, img_url, flag_img_url} = req.body
		const updateQuery = `
			UPDATE destinations
			SET
				destination = $1,
				description = $2,
				country = $3,
				img_url = $4,
				flag_img_url = $5
			WHERE id = $6
			RETURNING *
		`

		const results = await pool.query(updateQuery, [destination, description, country, img_url, flag_img_url, id])
		res.status(201).json(results.rows[0])

	} catch(err) {
		res.status(409).json({error: err.message})
	}
}

const deleteDestination = async(req, res) => {
	try {
		const id = parseInt(req.params.id)
		const deleteQuery = `
			DELETE FROM destinations
			WHERE id = $1
			RETURNING *
		`

		const results = await pool.query(deleteQuery, [id])
		res.status(200).json(results.rows[0])

	} catch(err) {
		res.status(409).json({error: err.message})
	}
}

export default {
	createDestination,
	getDestinations,
	getDestination,
	updateDestination,
	deleteDestination
}
