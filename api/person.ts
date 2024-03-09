import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { Person } from "../model/movie";

export const router = express.Router();

router.get("/", (req, res) => {
    conn.query('SELECT * FROM person', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.json(result);
    });
});

router.post("/", (req, res) => {
    const personData : Person = req.body;
    const sql = "INSERT INTO `person`(`movieID`, `name`, `photo`, `detail`, `typesID`) VALUES (?,?,?,?,?)";
    const values = [
        personData.movieID,
        personData.name,
        personData.photo,
        personData.detail,
        personData.typesID
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

router.delete("/delete/:personID", (req, res) => {
    const personID = req.params.personID;
    const sql = "DELETE FROM `person` WHERE `personID` = ?";
    
    conn.query(sql, [personID], (err, result) => {
        if (err) {
            console.error("Error deleting person:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(200).json({ message: "Person deleted successfully" });
        }
    });
});
