import express from "express";
import { conn } from "../dbconnect";

export const router = express.Router();
  router.get("/", (req, res) => {
    const name = req.query.name;
    let sql = `
        SELECT 
            m.*, 
            p.*,
            s.*, 
            c.*
        FROM 
            movie m
        LEFT JOIN 
            person p ON m.movieID = p.movieID
        LEFT JOIN 
            stars s ON m.movieID = s.movieID
        LEFT JOIN 
            creators c ON m.movieID = c.movieID
        WHERE 
            m.movieName LIKE ?`;

    conn.query(sql, [`%${name}%`], (err, result) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(result);
        }
    });
});
