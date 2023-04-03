import {pool} from '../db.js';

// Get all cars from DB
export const getCars = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM cars");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
        message: error.message,
        });
    }
}

// Get car by ID form DB
export const getCar = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM cars WHERE id =?", [
        req.params.id,
        ]);

        if (rows.length <= 0) {
        res.status(404).json({
            message: "Car not found",
        });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
        message: error.message,
        });
    }
}

// Add car to DB
export const createCar = async (req, res) => {
    try {
        const { name, badge, motor_serial } = req.body;
        const [rows] = await pool.query(
        "INSERT INTO cars (name, badge, motor_serial) VALUES (?, ?, ?)",
        [name, badge, motor_serial]
        );
        res.send({
        name,
        badge,
        motor_serial,
        });
    } catch (error) {
        return res.status(500).json({
        message: error.message,
        });
    }
}


//Update car by ID in DB
export const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, badge, motor_serial } = req.body;
        const [result] = await pool.query(
        "UPDATE cars SET name = IFNULL(?, name), badge = IFNULL(?, badge), motor_serial = IFNULL(?, motor_serial) WHERE id =?",
        [name, badge, motor_serial, id]
        );

        if (result.affectedRows <= 0) {
        res.status(404).json({
            message: "Car not found",
        });
        }

        const [rows] = await pool.query("SELECT * FROM cars WHERE id = ?", [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
        message: error.message,
        });
    }
}


// Delete car from DB
export const deleteCar = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM cars WHERE id = ?", [
        req.params.id,
        ]);

        if (result.affectedRows <= 0) {
        res.status(404).json({
            message: "Car not found",
        });
        }

        // Deletion successful, no response content
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
        message: error.message,
        });
    }
}