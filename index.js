require("dotenv").config()
const express = require("express")
const mysql = require("mysql2/promise")

const app = express()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
})

// db.getConnection()
//   .then(() => console.log("connexion ok"))
//   .catch(() => console.error("Erreur"))

app.get("/", async (req, res) => {
  const [result] = await db.query("select * from Person")

  res.json(result)
})

app.get("/:id", async (req, res) => {
  const { id } = req.params

  const [result] = await db.query("select * from Person where id = ?", [id])

  if (result.length) return res.send(result)

  return res.sendStatus(404)
})

app.listen(8000, () => console.log("server is running"))
