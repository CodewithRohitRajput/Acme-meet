import express from 'express'
import { analyzeMeetingController, getMeeting, getOneMeeting , deleteMeeting} from "../controllers/meeting.controller.js";    
const router = express.Router()

router.post('/analyze', analyzeMeetingController)
router.get('/get', getMeeting)
router.get('/get/:id', getOneMeeting)
router.delete('/get/:id', deleteMeeting)
// router.post('/create', createMeeting)


export default router

