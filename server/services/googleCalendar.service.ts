import { google } from "googleapis";

interface ActionItem {
    task: string;
    owner?: string | null;
    deadline?: string | null;
}

export const createCalendarEventsForMeeting = async (
    tokens: any,
    meetingSummary: string,
    actionItems: ActionItem[]
) => {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials(tokens);

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const createdEvents = [];

    for (const item of actionItems) {
        if (!item.task) continue;

        // Parse relative natural language deadlines like "tomorrow", "Friday", "next Monday"
        let startDate = new Date();
        const now = new Date();

        if (item.deadline) {
            const lowerDeadline = item.deadline.toLowerCase().trim();
            const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

            if (lowerDeadline.includes("tomorrow")) {
                startDate.setDate(now.getDate() + 1);
            } else if (daysOfWeek.some(day => lowerDeadline.includes(day))) {
                const targetDayIndex = daysOfWeek.findIndex(day => lowerDeadline.includes(day));
                let daysAhead = (targetDayIndex - now.getDay() + 7) % 7;
                if (daysAhead === 0) daysAhead = 7; // Target next week's day if today
                if (lowerDeadline.includes("next")) daysAhead += 7;
                startDate.setDate(now.getDate() + daysAhead);
            } else {
                const parsed = new Date(item.deadline);
                if (!isNaN(parsed.getTime())) {
                    startDate = parsed;
                } else {
                    // Default fallback if unparseable
                    startDate.setDate(now.getDate() + 1);
                }
            }
        } else {
            startDate.setDate(now.getDate() + 1);
        }

        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

        const eventSummary = item.owner
            ? `[Action Item] ${item.task} (Owner: ${item.owner})`
            : `[Action Item] ${item.task}`;

        const event = {
            summary: eventSummary,
            description: `Meeting Context / Summary: ${meetingSummary}`,
            start: {
                dateTime: startDate.toISOString(),
            },
            end: {
                dateTime: endDate.toISOString(),
            },
        };

        const response = await calendar.events.insert({
            calendarId: "primary",
            requestBody: event,
        });

        createdEvents.push({
            taskId: response.data.id,
            htmlLink: response.data.htmlLink,
            summary: response.data.summary,
        });
    }

    return createdEvents;
};
