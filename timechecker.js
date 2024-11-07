function timeCheckMiddleware(req, res, next) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const startHour = 9; // 9 AM
  const endHour = 10; // 5 PM (17 in 24-hour format)

  // Check if the current hour is within the allowed range
  if (currentHour >= startHour && currentHour < endHour) {
    next(); // Continue to the next middleware or route handler
  } else {
    res
      .status(403)
      .json({ message: "Access allowed only between 9 AM and 5 PM." });
  }
}

module.exports = timeCheckMiddleware;
