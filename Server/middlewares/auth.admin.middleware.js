import jwt from "jsonwebtoken";

export const authAdminMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not found",
      });
    }

    let decoded = "";
  
    try {
   
      decoded = await jwt.verify(token, process.env.SECRET_KEY);
     
      if (decoded.role !== "admin") {
        return res.status(404).json({
          success: false,
          message: "not an admin",
        });
      }

      req.user = decoded;
    } catch (e) {
   
      return res.status(401).json({
        success: false,
      });
    }

    next();
  } catch (error) {
   
    res.status(500).json({
      status: false,
      message: "Please login first",
    });
  }
};
