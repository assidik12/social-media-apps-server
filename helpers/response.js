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
    statusCode: res.statusCode,
    message,
  };
  res.json(datas);
  res.end();
};
