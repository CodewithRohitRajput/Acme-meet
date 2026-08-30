import type { Request, Response } from "express";
import { analyzeText } from "../services/gemini.service.js";
import { success } from "zod";

export const analyzeMeetingController = async (req: Request, res: Response) => {
    const {transcript} = req.body;

    if(!transcript){
        return res.status(404).json({
            success: false,
            messsage: "Transcript is required"
        })
    }
    const result = await analyzeText(transcript)
    result.pipeTextStreamToResponse(res)
    // return res.status(200).json({
    //     success: true,
    //     data: result
    // })
}