import server from "./config/server";

server().catch((err) => {
  console.error(err);
  process.exit(1);
});
