//include the requrired packages
const express = require('express');
const mysql = require('mysql2/promise');
require ('dotenv').config();
const port = 3000;

//database config info
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
};

//initialize the express app
const app = express();

//middleware to parse JSON requests
app.use(express.json());

//start the server
app.listen(port, () => {
    console.log('Server is running on port', port);
}); 

//example route: Get All ice cream
app.get('/allice', async (req, res) => {
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM defaultdb.icecream');
        res.json(rows);
    }   catch (err) { 
        console.error(err);
        res.status(500).json({ error: 'Server Error for allice' });
    }
});

//example route add ice cream
app.post('/addice', async (req, res) => {
    const { ice_name, ice_pic } = req.body;    
    try {
        let connection = await mysql.createConnection(dbConfig);    
        const [result] = await connection.execute(
            'INSERT INTO defaultdb.icecream (ice_name, Ice_pic) VALUES (?, ?)',
            [ice_name, ice_pic]
        );
        res.status(201).json({ message: 'Ice cream '+ice_name+' added successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error - Could not add ice cream'+ice_name });
    }       
});

//example route edit ice cream
app.put('/editice/:id', async (req, res) => {
    const { id } = req.params;
    const { ice_name, ice_pic } = req.body; 
    try {
        let connection = await mysql.createConnection(dbConfig);    
        const [result] = await connection.execute(
            'UPDATE defaultdb.icecream SET ice_name = ?, ice_pic = ? WHERE ice_id = ?',
            [ice_name, ice_pic, id]
        );
        res.json({ message: 'Ice cream '+ice_name+' updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error - Could not update ice cream '+ice_name });
    }
});

//example route delete ice cream
app.delete('/deleteice/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let connection = await mysql.createConnection(dbConfig);    
        const [result] = await connection.execute(
            'DELETE FROM defaultdb.icecream WHERE ice_id = ?',
            [id]
        );
        res.json({ message: 'Ice cream deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error - Could not delete ice cream' });
    }   
});


//EXAMPLE ROUTE update ICE CREAM
app.patch('/updateice/:id', async (req, res) => {
    const { id } = req.params;
    const { ice_name, ice_pic } = req.body;
    try {
        let connection = await mysql.createConnection(dbConfig);
        const fields = [];
        const values = [];
        if (ice_name) {
            fields.push('ice_name = ?');
            values.push(ice_name);
        }
        if (ice_pic) {
            fields.push('ice_pic = ?');
            values.push(ice_pic);
        }
        values.push(id);
        const sql = `UPDATE defaultdb.icecream SET ${fields.join(', ')} WHERE ice_id = ?`;
        const [result] = await connection.execute(sql, values);
        res.json({ message: 'Ice cream updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error - Could not update ice cream'+ice_name });
    }
});