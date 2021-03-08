exports.responsePattern = (
  statusCode = 200,
  statusMessage = "",
  data = {}
) => ({
  statusCode,
  statusMessage,
  data,
});
