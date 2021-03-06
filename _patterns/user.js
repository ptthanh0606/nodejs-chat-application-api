exports.checkUserPostPattern = (reqBody = null, successMessage = "") => {
  let isValid = false;
  let responseMessage = successMessage;

  if (!reqBody || !reqBody.uuid || !reqBody.displayName) {
    responseMessage =
      (!reqBody && "No body is found!") ||
      (!reqBody.uuid && "uuid field is not existed!") ||
      (!reqBody.displayName && "displayName field is not existed!");
  } else isValid = true;

  return [isValid, responseMessage];
};

exports.checkUserPutPattern = (reqBody = null, initalMessage) => {
  let isValid = false;
  let responseMessage = initalMessage;

  if (!reqBody || !reqBody.displayName) {
    responseMessage =
      (!reqBody && "No body found!") ||
      (!reqBody.displayName && "displayName field is missing!");
  } else isValid = true;

  return [isValid, responseMessage];
};

exports.checkUserLoginBody = (reqBody = null, initialMessage = "") => {
  let isValid = false;
  let responseMessage = initialMessage;

  if (!reqBody || !reqBody.email || !reqBody.password) {
    responseMessage =
      (!reqBody && "Request body is missing!") ||
      (!reqBody.email && "email field is missing") ||
      (!reqBody.password && "password is missing!");
  } else isValid = true;

  return [isValid, responseMessage];
};
