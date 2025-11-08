/*
 * هذا هو ملف "الوسيط" الآمن - netlify/functions/gemini.js
 * النسخة الصحيحة مع "gemini-1.0-pro"
 */

export async function handler(event, context) {
    // 1. جلب المفتاح السري بأمان من Netlify
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Missing API Key" })
        };
    }

    // 2. الرابط الصحيح لـ Google API (مع 1.0)
const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    // 3. جلب الـ "prompt" من index.html
    const clientRequestBody = JSON.parse(event.body);

    try {
        // 4. إرسال الطلب إلى Google
        const response = await fetch(GOOGLE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientRequestBody)
        });

        if (!response.ok) {
            // هذا هو المكان الذي يظهر فيه خطأ 404
            throw new Error(`Google API error! status: ${response.status}`);
        }

        const data = await response.json();

        // 5. إرجاع الرد إلى index.html
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error("Error in Netlify function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
}
