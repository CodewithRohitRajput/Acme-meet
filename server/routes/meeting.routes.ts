import express from 'express'
import { analyzeMeetingController } from "../controllers/meeting.controller.js";    
const router = express.Router()

router.post('/analyze', analyzeMeetingController)

export default router