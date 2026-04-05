import express from 'express'
import TripsController from '../controllers/trips.js'

const router = express.Router()

// == Trips ==
router.get('/', TripsController.getTrips)
router.get('/:id', TripsController.getTrip)
router.post('/', TripsController.createTrip)
router.patch('/:id', TripsController.updateTrip)
router.delete('/:id', TripsController. deleteTrip)



export default router