import fs from "fs/promises";
import express from "express";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.send("Node.js Users REST API 🎉”");
});

app.get("/test", (request, response) => {
  response.send("This is a test route");
});

app.get("/users", async (request, response) => {
  const data = await fs.readFile("data.json");
  const users = JSON.parse(data);
  response.json(users);
  console.log(users);
});

app.post("/users", async (request, response) => {
  const newUser = request.body;
  newUser.id = new Date().getTime();

  const data = await fs.readFile("data.json");
  const users = JSON.parse(data);
  users.push(newUser);
  console.log(newUser);
  fs.writeFile("data.json", JSON.stringify(users));
  response.json(users);
});

app.put("/users/:id", async (request, response) => {
  console.log(id);
  const data = await fs.readFile("data.json");
  const users = JSON.parse(data);

  let userToUpdate = users.find((user) => user.id === id);
  const body = request.body;
  console.log(body);
  userToUpdate.image = body.image;
  userToUpdate.mail = body.mail;
  userToUpdate.name = body.name;
  userToUpdate.title = body.title;

  fs.writeFile("data.json", JSON.stringify(users));
  response.json(users);
});
