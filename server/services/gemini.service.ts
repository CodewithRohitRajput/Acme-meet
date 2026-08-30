import {streamText} from 'ai'
import { google } from '@ai-sdk/google'
import {  meetingSchema, type meeting } from '../utils/meeting.schema.js'

export const analyzeText = async (transcript: string) =>{
const result =  streamText({
    model : google('gemini-3.5-flash'),
    // schema : meetingSchema,
    prompt : 
    `You are mom.ai, an AI meeting assistant.

Analyze the following meeting transcript.

Extract:

- A concise summary
- Client requirements
- Important decisions
- Action items
- Owners of action items when mentioned
- Deadlines when mentioned
- Risks or concerns

Important rules:

1. Do not invent information.
2. If an owner is not mentioned, return null.
3. If a deadline is not mentioned, return null.
4. Keep requirements concise.
5. Keep action items actionable.
6. Only include risks that are actually supported by the transcript.

Meeting transcript:

${transcript}
`

})

return result
}