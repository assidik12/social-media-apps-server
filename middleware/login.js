const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Cek apakah ada token di header permintaan
  const token = req.headers.authorization;

  // Jika tidak ada token, tolak permintaan
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  // Dekripsi token
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }

  // Set user ke variabel `req.user`
  req.user = decodedToken.user;

  // Lanjutkan permintaan
  next();
};
