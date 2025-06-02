// collegeBoardAPI.js

export async function fetchQuestionList() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
        "Cookie",
        "_abck=CE7AC973EE03F26D81E1C20D2873B357~-1~YAAQiPkpFzVrLdyWAQAAnBv3MQ258KdgIU2FnYbWH/OgRIIn/+7jITCYTbIE+H8sItBH965lic9JaLixuznoze3m/ElnLPsRTxH86LoLWvKDARa9SwOXvulvXrOrmP0sndnaU6W4MjVDFeCaYDLMFAssbZ71xkj66YVFukuj8y3ygoby6EEhpNZhRKcDNIY8zNF0h63E7iRlgu1ga91YSIMxjKqgK34FYxHZ5hbEXsQ0huztJdEKXyCHLAX5XoZnSdVvWyAnjafOUl3EsTBKEIw6PXWZwwhkcr8Xf5JjqUkzMEVQw/SSX0xEhC1mjx5xfa1Z10iCukSO8rfubetWrPGJfxWj46RCNGIsqP6q2ma+wJrxdu+jUN/Vu0gqMEJjj29DdkyS2zHFa3IuYY0gPpnvcFek5sBpuE7WglxIJ9jCq6niagT8FV6nv86mW66kBS+nFAzk9w==~-1~-1~-1; bm_sz=3706431F173D6D762CCA17671AC82374~YAAQiPkpFzZrLdyWAQAAnBv3MRvTdOlmDxOet73c3WPrWXW6c4o2X9QgpYyJ10zEuS4w5lXW1/p3p2BmYCG3h3dkXl43dkGSSI30ukMrRlq4Yj2g1pGWbeElezVrdU/LvP+DQLFNLcG/O6zpcBftEnXy+B+bY6kq4ZqWycJf+XzdhZubMIkgfXwM5JGr0Pw4DNbkwStzn0ijmfOrADEYfI8KdN/kakxl+chvX0ZJoBmK9p+RMoulGKzscwDJVOSCNyR9jRll2hrMB0z5DwUDpPbm4mgdjPPm5Fr+JTvZ97tVuDkBsXjmhezsILR9iVeX96GaqxFZe69LJn04TPq8KP47dZpfqikbKxbLcX62TYpv5g==~3487285~4342838"
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
        "_abck=CE7AC973EE03F26D81E1C20D2873B357~-1~YAAQiPkpFzVrLdyWAQAAnBv3MQ258KdgIU2FnYbWH/OgRIIn/+7jITCYTbIE+H8sItBH965lic9JaLixuznoze3m/ElnLPsRTxH86LoLWvKDARa9SwOXvulvXrOrmP0sndnaU6W4MjVDFeCaYDLMFAssbZ71xkj66YVFukuj8y3ygoby6EEhpNZhRKcDNIY8zNF0h63E7iRlgu1ga91YSIMxjKqgK34FYxHZ5hbEXsQ0huztJdEKXyCHLAX5XoZnSdVvWyAnjafOUl3EsTBKEIw6PXWZwwhkcr8Xf5JjqUkzMEVQw/SSX0xEhC1mjx5xfa1Z10iCukSO8rfubetWrPGJfxWj46RCNGIsqP6q2ma+wJrxdu+jUN/Vu0gqMEJjj29DdkyS2zHFa3IuYY0gPpnvcFek5sBpuE7WglxIJ9jCq6niagT8FV6nv86mW66kBS+nFAzk9w==~-1~-1~-1; bm_sz=3706431F173D6D762CCA17671AC82374~YAAQiPkpFzZrLdyWAQAAnBv3MRvTdOlmDxOet73c3WPrWXW6c4o2X9QgpYyJ10zEuS4w5lXW1/p3p2BmYCG3h3dkXl43dkGSSI30ukMrRlq4Yj2g1pGWbeElezVrdU/LvP+DQLFNLcG/O6zpcBftEnXy+B+bY6kq4ZqWycJf+XzdhZubMIkgfXwM5JGr0Pw4DNbkwStzn0ijmfOrADEYfI8KdN/kakxl+chvX0ZJoBmK9p+RMoulGKzscwDJVOSCNyR9jRll2hrMB0z5DwUDpPbm4mgdjPPm5Fr+JTvZ97tVuDkBsXjmhezsILR9iVeX96GaqxFZe69LJn04TPq8KP47dZpfqikbKxbLcX62TYpv5g==~3487285~4342838"
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
