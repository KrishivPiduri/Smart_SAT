// collegeBoardAPI.js

export async function fetchQuestionList() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
        "Cookie",
        "_abck=YOUR_COOKIE_HERE; bm_sz=YOUR_COOKIE_HERE"
    );

    const raw = JSON.stringify({
        asmtEventId: 99,
        test: 1,
        domain: "INI,CAS,EOI,SEC",
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            "https://qbank-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-questions",
            requestOptions
        );
        return await response.json(); // Array of questions
    } catch (error) {
        console.error("Error fetching question list:", error);
        return null;
    }
}

export async function fetchQuestionDetail(external_id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
        "Cookie",
        "_abck=YOUR_COOKIE_HERE; bm_sz=YOUR_COOKIE_HERE"
    );

    const raw = JSON.stringify({
        external_id,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    try {
        const response = await fetch(
            "https://qbank-api.collegeboard.org/msreportingquestionbank-prod/questionbank/digital/get-question",
            requestOptions
        );
        return await response.json(); // Single question details
    } catch (error) {
        console.error("Error fetching question detail:", error);
        return null;
    }
}
