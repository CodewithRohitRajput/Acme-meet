import express from 'express'
import { analyzeMeetingController, getMeeting } from "../controllers/meeting.controller.js";    
const router = express.Router()

router.post('/analyze', analyzeMeetingController)
router.post('/get', getMeeting)
// router.post('/create', createMeeting)


export default router

