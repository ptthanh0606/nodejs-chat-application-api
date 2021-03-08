exports.checkContactPostBody = (reqBody = null, initialMessage = "") => {
  let isValid = false;
  let responseMessage = initialMessage;

  if (!reqBody || !reqBody.savedPeople) {
    responseMessage = !reqBody && "Request body is missing!";
  } else isValid = true;

  return [isValid, responseMessage];
};

exports.checkAddContactPutBody = (reqBody = null, initialMessage = "") => {
  let isValid = false;
  let responseMessage = initialMessage;

  if (!reqBody || !reqBody.uuid || !reqBody.nickname) {
    responseMessage =
      (!reqBody && "Request body is missing!") ||
      (!reqBody.uuid && "savedPeople is missing!") ||
      (!reqBody.nickname && "nickname field is missing!");
  } else isValid = true;

  return [isValid, responseMessage];
};
