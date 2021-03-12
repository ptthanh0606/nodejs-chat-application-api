exports.checkSendMessageBody = function (reqBody = null, initialMessage = "") {
  let isValid = false;
  let responseMessage = initialMessage;

  if (!reqBody || !reqBody.uuid || !reqBody.content) {
    responseMessage =
      (!reqBody && "Please provide a body") ||
      (!reqBody.uuid && "uuid field is missing") ||
      (!reqBody.content && "content field is missing");
  } else isValid = true;

  return [isValid, responseMessage];
};
