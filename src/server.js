import app from "./app.js";

const port = 3000;

app.listen(process.env.PORT || port, () =>
  console.log(`Server is running at port: ${port}`)
);
