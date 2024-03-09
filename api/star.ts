import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { Stars } from "../model/movie";

export const router = express.Router();

router.get("/", (req, res) => {
    conn.query('SELECT * FROM stars', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.json(result);
    });
});

router.post("/", (req, res) => {
    const starData : Stars = req.body;
    const sql = "INSERT INTO `stars`(`personID`,`movieID`) VALUES (?,?)";
    const values = [
      starData.personID,
      starData.movieID
    ];
    const formattedSql = mysql.format(sql, values);
    
    conn.query(formattedSql, (err, result) => {
        if (err) {
            console.error("Error inserting person:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(201).json({ insertId: result.insertId });
        }
    });
});

router.delete("/:starID", (req, res) => {
    const starID = req.params.starID;
    const sql = "DELETE FROM `stars` WHERE `starID` = ?";
    
    conn.query(sql, [starID], (err, result) => {
        if (err) {
            console.error("Error deleting star:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(200).json({ message: "star deleted successfully" });
        }
    });
});