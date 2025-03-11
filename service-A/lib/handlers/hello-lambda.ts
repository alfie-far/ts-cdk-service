export async function handler(event: any) {
    console.log("event is ", event);
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hello World. This is the lambda handler responding to your request",
            statusText: "OK",
        }),
    };
}