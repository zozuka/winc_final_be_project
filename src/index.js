import express from "express";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import bookingRouter from "./routes/bookings.js";
import propertyRouter from "./routes/properties.js";
import reviewRouter from "./routes/reviews.js";
import hostRouter from "./routes/hosts.js";
import amenityRouter from "./routes/amenities.js";

import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(log);

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/bookings", bookingRouter);
app.use("/properties", propertyRouter);
app.use("/reviews", reviewRouter);
app.use("/hosts", hostRouter);
app.use("/amenities", amenityRouter);

app.get("/", (req, res) => {
  res.send("Hello world, this is my final project to submit!");
});
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
