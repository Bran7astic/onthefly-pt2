import express from 'express'
import TripsDestinationsController from '../controllers/tripsDestinations.js'

const router = express.Router()

// == Trips Destinations ==
router.get('/', TripsDestinationsController.getTripsDestinations)
router.get('/trips/:destination_id', TripsDestinationsController.getAllTrips)
router.get('/destinations/:trip_id', TripsDestinationsController.getAllDestinations)
router.post('/', TripsDestinationsController.createTripDestination)

export default router