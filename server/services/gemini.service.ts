import {generateText} from 'ai'
import { google } from '@ai-sdk/google'

export const analyzeText = async (transcript: string) =>{
const {text} = await generateText({
    model : google('gemini-2.5-flash'),
    prompt : `
    You are mom.ai, an AI meeting assistant.

Analyze the following meeting transcript.

Extract:
1. Summary
2. Requirements
3. Decisions
4. Action items
5. Deadlines
6. Risks or concerns

Meeting transcript:

${transcript}
`
})

return text
}