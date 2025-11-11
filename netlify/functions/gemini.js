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

/*
 * هذا هو ملف "الوسيط" الآمن - netlify/functions/gemini.js
 * النسخة النهائية - (المشكلة كانت الاسم غير كامل)
 * الحل: استخدام النموذج المستقر (gemini-1.0-pro) مع (v1)
 */
/*
 * هذا هو ملف "الوسيط" الآمن - netlify/functions/gemini.js
 * -----------------------------------------------------------
 * ❗️ نسخة "تشخيصية" (Diagnostic) ❗️
 * هذا الكود لن يشرح الإجابات، بل سيحاول سحب "قائمة النماذج"
 * المتاحة لمفتاحك.
 */

export async function handler(event, context) {
    // 1. جلب المفتاح السري بأمان من Netlify
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
        return { statusCode: 500, body: JSON.stringify({ error: "Missing API Key" }) };
    }

    // 2. هذا هو الرابط "التشخيصي" لسرد النماذج
    // نحن نستخدم "v1" لسرد النماذج المستقرة
    const LIST_MODELS_URL = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;

    try {
        // 3. نحن نستخدم "GET" (لجلب قائمة) وليس "POST" (لإنشاء محتوى)
        const response = await fetch(LIST_MODELS_URL, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        // 4. إذا فشل سرد النماذج (مثل خطأ 403)
        if (!response.ok) {
            console.error("Google API Error Response (ListModels):", data);
            throw new Error(`Google API error! status: ${response.status}. Response: ${JSON.stringify(data.error)}`);
        }

        /*
         * 5. إذا نجحنا!!! 
         * هذا يعني أننا سنرى قائمة النماذج في السجل.
         * سنقوم بإرجاع خطأ للمستخدم (لأننا لم نقم بإنشاء شرح)،
         * لكننا سنعرف ما هي النماذج المتاحة لك.
         */
        console.log("!!! SUCCESS: AVAILABLE MODELS FOUND !!!");
        console.log(JSON.stringify(data)); // اطبع القائمة في السجل

        // أعد رسالة خطأ للمستخدم (هذا متوقع)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "DIAGNOSTIC_RUN_COMPLETE", available_models: data })
        };

    } catch (error) {
        console.error("Error in Netlify function (Diagnostic):", error);
        // 6. إصلاح الخطأ المرجعي (ReferenceError)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }) // تم الإصلاح: error.message
        };
    }
}
