import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { Movie } from "../model/movie";


export const router = express.Router();

router.get("/", (req, res) => {
    conn.query('SELECT * FROM movie', (err, result)=>{
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      res.json(result);
    })
  });
  
  router.post("/", (req, res) => {
    let movie : Movie  = req.body; 
    let sql = "INSERT INTO `movie`(`movieName`, `movieDetail`, `moviePhoto`) VALUES (?,?,?)";
    sql = mysql.format(sql, [
        movie.movieName,
        movie.movieDetail,
        movie.moviePhoto
    ]);
    conn.query(sql, (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ insertId: result.insertId });
      }
    });
  });

  router.delete("/delete/:movieID", (req, res) => {
      const movieID = req.params.movieID;
      const sql = "DELETE FROM `movie` WHERE `movieID` = ?";
      conn.query(sql, [movieID], (err, result) => {
          if (err) {
              console.error("Error deleting movie:", err);
              res.status(500).json({ error: "Internal Server Error" });
          } else {
              res.status(200).json({ message: "Movie deleted successfully" });
          }
      });
  });
