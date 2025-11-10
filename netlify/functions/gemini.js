/*
 * هذا هو ملف "الوسيط" الآمن - netlify/functions/gemini.js
 * النسخة الصحيحة مع "gemini-1.0-pro"
 */
/*
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
//const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    //const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;
// ✅ السطر الصحيح والنهائي (يستخدم v1 و gemini-1.5-flash)
const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
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
*/
/*
 * هذا هو ملف "الوسيط" الآمن - netlify/functions/gemini.js
 * النسخة النهائية والصحيحة 100%
 */

/*
 * هذا هو ملف "الوسيط" الآمن - netlify/functions/gemini.js
 * النسخة النهائية والصحيحة 100%
 * (المشكلة كانت: gemini-1.5-flash يتطلب v1beta)
 */

/*
 * هذا هو ملف "الوسيط" الآمن - netlify/functions/gemini.js
 * النسخة النهائية - (المشكلة كانت أن المشروع لا يملك 1.5-flash)
 * الحل: استخدام النموذج المستقر gemini-pro مع v1
 */

/*
 * هذا هو ملف "الوسيط" الآمن - netlify/functions/gemini.js
 * النسخة النهائية - (المشكلة كانت الاسم غير كامل)
 * الحل: استخدام النموذج المستقر (gemini-1.0-pro) مع (v1)
 */

export async function handler(event, context) {
    // 1. جلب المفتاح السري بأمان من Netlify
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Missing API Key in Netlify Environment" })
        };
    }

    // 2. الرابط الصحيح والنهائي لـ Google API
    // (استخدام النموذج المستقر gemini-1.0-pro مع v1)
    const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${API_KEY}`;

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

        const data = await response.json();

        // إذا كان الرد ليس OK
        if (!response.ok) {
            console.error("Google API Error Response:", data);
            // هذا هو السجل الذي ساعدنا
            throw new Error(`Google API error! status: ${response.status}. Response: ${JSON.stringify(data.error)}`);
        }

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
