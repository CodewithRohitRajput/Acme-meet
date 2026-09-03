import {google} from 'googleapis'

const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI} = process.env

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
    throw new Error(
        'Missing Google OAuth configuration. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URI.'
    )
}

const oauth2client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
)

export const getGoogleAuthUrl = () => {
    return oauth2client.generateAuthUrl({
        access_type: "offline",
        scope:[
              "https://www.googleapis.com/auth/documents",
            "https://www.googleapis.com/auth/drive.file"
        ]
    })
}

export const getGoogleTokens = async (code:string) => {
    const {tokens} = await oauth2client.getToken(code)
    return tokens
}