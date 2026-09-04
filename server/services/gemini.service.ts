import { generateObject, generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { meetingSchema } from '../utils/meeting.schema.js'
import fs from 'fs/promises'

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

if (!apiKey) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is missing')
}

console.log('Gemini service: API key FOUND')

const googleAI = createGoogleGenerativeAI({
    apiKey: apiKey
})

export const analyzeText = async (transcript: string) => {
    const { object } = await generateObject({
        model: googleAI('gemini-3.6-flash'),
        schema: meetingSchema,
        prompt: `
You are mom.ai, an AI meeting assistant.

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

    return object
}

export const transcribeSpeech = async (filePath: string) => {
    const audio = await fs.readFile(filePath)

    const result = await generateText({
        model: googleAI('gemini-3.6-flash'),
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: 'Transcribe this audio exactly. Do not summarize it. Return only the spoken words.'
                    },
                    {
                        type: 'file',
                        data: audio,
                        mediaType: 'audio/mpeg'
                    }
                ]
            }
        ]
    })

    return result.text
}