import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface GA4EventParams {
    [key: string]: any;
}

export async function sendToGoogleAnalytics4(
    measurementId: string,
    apiSecret: string,
    eventName: string,
    params: GA4EventParams
) {
    const clientId = uuidv4(); // Unique client identifier

    const payload = {
        client_id: clientId,
        events: [
            {
                name: eventName,
                params: params,
            },
        ],
    };

    try {
        const response = await axios.post(
            `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
            payload
        );
        console.log('Event sent successfully:', response.status);
    } catch (error) {
        console.error('Failed to send event:', error);
    }
}