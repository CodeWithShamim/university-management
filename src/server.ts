import app from "./app";
import dbConnection from "./utils/dbConnect";

const port: string | undefined = process.env.PORT;

async function main() {
  await dbConnection();

  app.listen(port, () => {
    console.log("Server listening to port", port);
  });
}

main().catch((err) => console.log(err));
