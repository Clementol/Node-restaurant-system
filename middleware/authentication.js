const jwt = require("jsonwebtoken");
const config = require("../config");

const requireSignIn = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Could not proceed to Authentication" });
    return;
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, config.JWT_SECRETE);
    if (decoded) {
      req.user = decoded.data;

      next();
    } else if (!decoded) {
      res.status(401).json({ msg: `Please sign in again ${error}` });
      return;
    }
  } catch (error) {
    res
      .status(401)
      .send(JSON.stringify({ msg: `Token is not valid ${error}` }));
  }
};

module.exports = {requireSignIn}