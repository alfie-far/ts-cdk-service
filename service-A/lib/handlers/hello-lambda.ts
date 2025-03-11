import { helperFunction } from "../../src/index";

exports.handler = async function (event: any) {
  console.log("event is ", event);
  const someOutcome = helperFunction(event.name);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        "Hello World. This is the lambda handler responding to your request",
      someOutcome,
      statusText: "OK",
    }),
  };
};
