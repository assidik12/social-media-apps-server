exports.successLogin = function (payload, message, res) {
  const datas = {
    success: true,
    statusCode: res.statusCode,
    message,
    payload,
  };
  res.json(datas);
  res.end();
};

exports.errorLogin = function (message, res) {
  const datas = {
    success: false,
    statusCode: 400,
    message,
  };
  res.json(datas);
  res.end();
};

exports.successCrateContent = function (payload, message, res) {
  const datas = {
    success: true,
    statusCode: res.statusCode,
    message,
    payload,
  };
  res.json(datas);
  res.end();
};
exports.errorCrateContent = function (payload, message, res) {
  const datas = {
    success: false,
    statusCode: 400,
    message,
    payload,
  };
  res.json(datas);
  res.end();
};
