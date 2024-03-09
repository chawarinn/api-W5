import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { Creators } from "../model/movie";

export const router = express.Router();

router.get("/", (req, res) => {
    conn.query('SELECT * FROM creators', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.json(result);
    });
});

router.post("/", (req, res) => {
    const creatorData : Creators= req.body;
    const sql = "INSERT INTO `creators`(`personID`,`movieID`) VALUES (?,?)";
    const values = [
      creatorData.personID,
      creatorData.movieID];
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

router.delete("/delete/:creatorID", (req, res) => {
    const creatorID = req.params.creatorID;
    const sql = "DELETE FROM `creators` WHERE `creatorID` = ?";
    
    conn.query(sql, [creatorID], (err, result) => {
        if (err) {
            console.error("Error deleting creator:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(200).json({ message: "creator deleted successfully" });
        }
    });
});

