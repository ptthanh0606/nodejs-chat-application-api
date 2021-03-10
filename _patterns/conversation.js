exports.checkStartConversationBody = function (
  reqBody = null,
  initialMessage = ""
) {
  let isValid = false;
  let responseMsg = initialMessage;

  if (!reqBody || !reqBody.length) {
    responseMsg =
      (!reqBody && "Request body is missing!") ||
      (!reqBody.length && "Cannot accept empty uuids");
  } else isValid = true;

  return [isValid, responseMsg];
};
