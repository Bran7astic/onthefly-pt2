import express from 'express'
import ActivitiesController from '../controllers/activities.js'

const router = express.Router()

// == Trips ==
router.get('/', ActivitiesController.getActivities)
router.get('/:trip_id', ActivitiesController.getTripActivites)
router.post('/', ActivitiesController.createActivity)
router.patch('/:id', ActivitiesController.updateActivityLikes)
router.delete('/:id', ActivitiesController.deleteActivity)



export default router