/*
 * هذا هو ملف "الوسيط" الآمن - netlify/functions/gemini.js
 */

export async function handler(event, context) {
    // 1. جلب المفتاح السري بأمان من Netlify (وليس من الكود!)
    // سنقوم بتعيين هذا المفتاح في لوحة تحكم Netlify لاحقاً
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Missing API Key" })
        };
    }

    // 2. هذا هو الرابط الحقيقي لـ Google API
    const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${API_KEY}`;
    // 3. جلب الـ "prompt" الذي أرسله المستخدم من ملف index.html
    const clientRequestBody = JSON.parse(event.body);

    try {
        // 4. إرسال الطلب إلى Google (من الخادم، وليس المتصفح)
        const response = await fetch(GOOGLE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientRequestBody) // إرسال الطلب كما هو
        });

        if (!response.ok) {
            throw new Error(`Google API error! status: ${response.status}`);
        }

        const data = await response.json();

        // 5. إرجاع الرد النظيف إلى ملف index.html
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
