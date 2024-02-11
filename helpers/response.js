exports.successLogin = function (payload, message, res) {
  const datas = {
    success: payload.success,
    statusCode: payload.statusCode,
    message,
    token: payload.token,
  };
  res.json(datas);
  res.end();
};

exports.errorLogin = function (message, url, statusCode, res) {
  const datas = {
    success: false,
    url,
    statusCode,
    message,
  };
  res.json(datas);
  res.end();
};

exports.successCrateContent = function (payload, message, res) {
  const datas = {
    success: true,
    statusCode: payload.statusCode,
    message,
    payload,
  };
  res.json(datas);
  res.end();
};
exports.errorCrateContent = function (payload, message, res) {
  const datas = {
    success: false,
    statusCode: payload.statusCode,
    message,
    payload,
  };
  res.json(datas);
  res.end();
};
