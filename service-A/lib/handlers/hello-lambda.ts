export async function handler(event: any) {
    console.log("event is ", event);
    return {
        statusCode: 200,
        body: JSON.stringify("Hello World!"),
    };
}