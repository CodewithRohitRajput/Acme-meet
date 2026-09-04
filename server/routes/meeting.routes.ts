import express from 'express'
import {  getMeeting, getOneMeeting , deleteMeeting, syncMeetingToCalendar } from "../controllers/meeting.controller.js";    
import upload from '../middleware/upload.js';
import { transcribeMeeting } from '../controllers/meeting.controller.js';

const router = express.Router()

// router.post('/analyze', analyzeMeetingController)
router.get('/get', getMeeting)
router.get('/get/:id', getOneMeeting)
router.delete('/get/:id', deleteMeeting)
router.post('/transcribe', upload.single("audio"),transcribeMeeting )
router.post('/get/:id/sync-calendar', syncMeetingToCalendar)

export default router

