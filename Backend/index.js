const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;  // Set this as your backend port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: '185.212.70.52',  // Change this if you're using a remote DB
    user: 'u762209995_jaya',       // Your MySQL username
    password: 'Pm19750211@',       // Your MySQL password
    database: 'u762209995_pos'  // The name of your database
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

// Get items data
app.get('/api/items', (req, res) => {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Insert items data
app.post('/api/items', (req, res) => {
    const { name, price } = req.body;
    const sql = 'INSERT INTO items (name, price) VALUES (?, ?)';
    db.query(sql, [name, price], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Item added successfully!' });
    });
});

// Route to get all product categories
app.get('/api/productcategories', (req, res) => {
    const query = 'SELECT * FROM productcategories';
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching product categories', error: err.message });
        }
        res.status(200).json(result); // Return the result directly
    });
});

app.get('/api/products', (req, res) => {
    const query = `
        SELECT CAST(p.id AS CHAR) AS id, p.name, p.price, p.discount, p.quantity, pc.name AS category_name
        FROM products p
        JOIN productcategories pc ON p.productCategoryId = pc.id
    `;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching products', error: err.message });
        }
        res.status(200).json(result);
    });
});


// Route to insert data into products table (MySQL)
app.post('/api/products', (req, res) => {
    const { name, price, discount, quantity, productCategoryId } = req.body;

    const query = `INSERT INTO products (name, price, discount, quantity, productCategoryId) VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [name, price, discount, quantity, productCategoryId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting product', error: err.message });
        }
        res.status(201).json({ message: 'Product created successfully!', productId: result.insertId });
    });
});
// Insert salesrep data
app.post('/api/salesreps', (req, res) => {
    const { name, address, phoneNumber, experienceLevel } = req.body;

    // Insert query
    const sql = `
        INSERT INTO salesreps (name, address, phoneNumber, experienceLevel, createdAt, updatedAt) 
        VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

    // Execute query
    db.query(sql, [name, address, phoneNumber, experienceLevel], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting salesrep', error: err.message });
        }
        res.status(201).json({ message: 'Salesrep added successfully!', salesrepId: result.insertId });
    });
});

// 2. Get all sales representatives
app.get('/api/salesreps', (req, res) => {
    const sql = 'SELECT * FROM salesreps ORDER BY createdAt DESC';

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching salesreps', error: err.message });
        }
        res.status(200).json(result);
    });
});

// 3. Update a sales representative
app.put('/api/salesreps/:id', (req, res) => {
    const { id } = req.params;
    const { name, address, phoneNumber, experienceLevel } = req.body;

    const sql = `
        UPDATE salesreps 
        SET name = ?, address = ?, phoneNumber = ?, experienceLevel = ?, updatedAt = NOW()
        WHERE id = ?
    `;

    db.query(sql, [name, address, phoneNumber, experienceLevel, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating salesrep', error: err.message });
        }
        res.status(200).json({ message: 'SalesRep updated successfully!' });
    });
});

// 4. Delete a sales representative
app.delete('/api/salesreps/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM salesreps WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting salesrep', error: err.message });
        }
        res.status(200).json({ message: 'SalesRep deleted successfully!' });
    });
});

// Insert vehicle data
app.post('/api/vehicles', (req, res) => {
    const { vehicleNumber, vehicleName } = req.body;

    // Insert query
    const sql = `
        INSERT INTO vehicles (vehicleNumber, vehicleName, createdAt, updatedAt) 
        VALUES (?, ?, NOW(), NOW())
    `;

    // Execute query
    db.query(sql, [vehicleNumber, vehicleName], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting vehicle', error: err.message });
        }
        res.status(201).json({ message: 'Vehicle added successfully!', vehicleId: result.insertId });
    });
});

// Get all vehicles
app.get('/api/vehicles', (req, res) => {
    const sql = 'SELECT * FROM vehicles';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching vehicles', error: err.message });
        }
        res.status(200).json(result);
    });
});

// Update vehicle data
app.put('/api/vehicles/:id', (req, res) => {
    const { id } = req.params;
    const { vehicleNumber, vehicleName } = req.body;

    const sql = 'UPDATE vehicles SET vehicleNumber = ?, vehicleName = ?, updatedAt = NOW() WHERE id = ?';

    db.query(sql, [vehicleNumber, vehicleName, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating vehicle', error: err.message });
        }
        res.status(200).json({ message: 'Vehicle updated successfully!' });
    });
});

// Delete vehicle data
app.delete('/api/vehicles/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM vehicles WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting vehicle', error: err.message });
        }
        res.status(200).json({ message: 'Vehicle deleted successfully!' });
    });
});
// Add a new root
app.post('/api/roots', (req, res) => {
    const { name } = req.body;

    const sql = 'INSERT INTO roots (name, createdAt, updatedAt) VALUES (?, NOW(), NOW())';

    db.query(sql, [name], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding root', error: err.message });
        }
        res.status(201).json({ message: 'Root added successfully!', id: result.insertId });
    });
});

// Get all roots
app.get('/api/roots', (req, res) => {
    const sql = 'SELECT * FROM roots';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete a root by ID
app.delete('/api/roots/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM roots WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting root', error: err.message });
        }
        res.status(200).json({ message: 'Root deleted successfully!' });
    });
});

// Update a root by ID
app.put('/api/roots/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const sql = 'UPDATE roots SET name = ?, updatedAt = NOW() WHERE id = ?';

    db.query(sql, [name, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating root', error: err.message });
        }
        res.status(200).json({ message: 'Root updated successfully!' });
    });
});
// Add a new customer
app.post('/api/customers', (req, res) => {
    const { name, address, whatsappNumber, birthday, rootId } = req.body;
    const sql = `INSERT INTO customers (name, address, whatsappNumber, birthday, rootId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;

    db.query(sql, [name, address, whatsappNumber, birthday, rootId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding customer', error: err.message });
        }
        res.status(201).json({ message: 'Customer added successfully!', customerId: result.insertId });
    });
});

// Get all customers
app.get('/api/customers', (req, res) => {
    const sql = `SELECT customers.id, customers.name, customers.address, customers.whatsappNumber, customers.birthday, customers.createdAt, customers.updatedAt, roots.name AS rootName
                 FROM customers
                 LEFT JOIN roots ON customers.rootId = roots.id`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete a customer
app.delete('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM customers WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting customer' });
        }
        res.status(200).json({ message: 'Customer deleted successfully!' });
    });
});
// Update customer details
app.put('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const { name, address, whatsappNumber, birthday, rootId } = req.body;

    const sql = `
        UPDATE customers 
        SET name = ?, address = ?, whatsappNumber = ?, birthday = ?, rootId = ?, updatedAt = NOW() 
        WHERE id = ?
    `;

    db.query(sql, [name, address, whatsappNumber, birthday, rootId, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating customer', error: err.message });
        }
        res.status(200).json({ message: 'Customer updated successfully!' });
    });
});
// Route to manually insert daily sales planning
app.post('/api/dailysalesplanningss', (req, res) => {
    const { date, salesRepId, vehicleId, rootId } = req.body;

    const sql = `
        INSERT INTO dailysalesplanningss (date, salesRepId, vehicleId, rootId, createdAt, updatedAt) 
        VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

    db.query(sql, [date, salesRepId, vehicleId, rootId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting daily sales plan', error: err.message });
        }
        res.status(201).json({ message: 'Daily sales plan added successfully!', planId: result.insertId });
    });
});
app.get('/api/dailysalesplanningss', (req, res) => {
    const sql = `
        SELECT d.id, d.date, s.name AS salesRepName, v.vehicleNumber, r.name AS rootName
        FROM dailysalesplanningss d
        JOIN salesreps s ON d.salesRepId = s.id
        JOIN vehicles v ON d.vehicleId = v.id
        JOIN roots r ON d.rootId = r.id
        ORDER BY d.date DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching sales plans', error: err.message });
        }
        res.status(200).json(results);
    });
});

app.delete('/api/dailysalesplanningss/:id', (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM dailysalesplanningss WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting sales plan', error: err.message });
        }
        res.status(200).json({ message: 'Sales plan deleted successfully' });
    });
});

app.put('/api/dailysalesplanningss/:id', (req, res) => {
    const { id } = req.params;
    const { date, salesRepId, vehicleId, rootId } = req.body;

    // Update logic
    // Find the sales plan by id and update with the new data

    // Example with MongoDB
    DailySalesPlan.findByIdAndUpdate(id, { date, salesRepId, vehicleId, rootId }, { new: true }, (err, updatedPlan) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedPlan);
    });
});

// Create Invoice
app.post('/api/invoices', (req, res) => {
    const { dailySalesPlanningId, date, totalAmount } = req.body;
    const query = `
        INSERT INTO invoicess (dailySalesPlanningId, date, totalAmount, createdAt, updatedAt)
        VALUES (?, ?, ?, NOW(), NOW())
    `;
    console.log(dailySalesPlanningId);
    db.query(query, [dailySalesPlanningId, date, totalAmount], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId });
    });
});

// 1. Add product to sales transaction
app.post('/api/salestransactions', (req, res) => {
    const { productId, quantity, freeIssue, price, totalAmount, invoiceId } = req.body;

    console.log(productId);

    // Start a transaction
    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ message: 'Transaction error', error: err.message });
        }

        // 1. Insert into sales_transactions table
        const insertTransactionSql = `INSERT INTO sales_transactions (productId, quantity, price, totalAmount, invoiceId, createdAt, updatedAt, freeIssue) 
                                      VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)`;

        db.query(insertTransactionSql, [productId, quantity, price, totalAmount, invoiceId, freeIssue], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).json({ message: 'Error adding product to invoice', error: err.message });
                });
            }

        // Retrieve the ID of the newly inserted transaction
            const newTransactionId = result.insertId;
            console.log(newTransactionId);

            // Commit the transaction after successful insertion
            db.commit((err) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ message: 'Transaction commit error', error: err.message });
                    });
                }

                // Send back the transaction ID along with success message
                res.status(201).json({ 
                    transactionId: newTransactionId  // Returning only the transaction ID
                });
            });
        });
    });
});

// 2. Update invoice total amount
app.put('/api/invoices/:invoiceId', (req, res) => {
    const { invoiceId } = req.params;
    const { totalAmount } = req.body;

    // Get the current total amount of the invoice
    const getInvoiceTotalQuery = `SELECT totalAmount FROM invoices WHERE id = ?`;

    db.query(getInvoiceTotalQuery, [invoiceId], (err, result) => {
        if (err || result.length === 0) {
            return res.status(500).json({ message: 'Error retrieving invoice', error: err?.message || 'Invoice not found' });
        }

        const currentTotal = result[0].totalAmount;

        // Update total amount by adding the new totalAmount to the existing total
        const updatedTotal = currentTotal + totalAmount;
        const updateInvoiceTotalQuery = `UPDATE invoices SET totalAmount = ?, updatedAt = NOW() WHERE id = ?`;

        db.query(updateInvoiceTotalQuery, [updatedTotal, invoiceId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating invoice total amount', error: err.message });
            }
            res.status(200).json({ message: 'Invoice total amount updated successfully!' });
        });
    });
});

// Route to update the total amount in an invoice
app.put('/api/invoices/:id', (req, res) => {
    const { id } = req.params; // Get invoice ID from URL parameters
    const { totalAmount } = req.body; // Get total amount from the request body

    // Validate the incoming data
    if (totalAmount === undefined) {
        return res.status(400).json({ message: 'Total amount is required' });
    }
console.log(totalAmount);
    const query = `
        UPDATE invoicess
        SET totalAmount = ?
        WHERE id = ?
    `;

    // Update the total amount in the invoice table
    db.query(query, [totalAmount, id], (err, result) => {
        if (err) {
            console.error('Error updating invoice total amount:', err); // Log the error
            return res.status(500).json({ message: 'Error updating invoice', error: err.message });
        }

        if (result.affectedRows === 0) {
            // If no rows were affected, the invoice might not exist
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).json({ message: 'Invoice updated successfully' });
    });
});

// Route to get invoice data by ID
app.get('/api/invoices/:invoiceId', (req, res) => {
    const { invoiceId } = req.params;

    // Query to get the invoice details
    const query = `
        SELECT 
            c.id AS customerId,
            c.name AS customerName,
            c.address AS customerAddress
        FROM 
            invoicess i
        JOIN 
            customers c ON i.customerId = c.id
        WHERE 
            i.id = ?
    
    `;

    db.query(query, [invoiceId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching invoice data', error: err.message });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.status(200).json(result[0]);  // Return the first (and only) invoice
    });
});

// Route to update customerId for an invoice
app.put('/api/invoices/:invoiceId/customer', (req, res) => {
    const invoiceId = req.params.invoiceId;
    const { customerId } = req.body;

    // Validate if customerId is provided
    if (!customerId) {
        return res.status(400).json({ error: 'Customer ID is required' });
    }

    // SQL query to update customerId in the invoices table
    const query = 'UPDATE invoicess SET customerId = ? WHERE id = ?';

    db.query(query, [customerId, invoiceId], (err, results) => {
        if (err) {
            console.error('Error updating customerId for invoice:', err);
            return res.status(500).json({ error: 'Database error while updating invoice' });
        }

        // Check if any rows were affected
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        // Successful update
        res.json({ message: 'Customer ID updated successfully' });
    });
});
//rep sales amount 
app.get('/api/sales-reps/achievements', (req, res) => {
    const query = `
        SELECT 
            sr.id AS salesRepId,
            sr.name AS salesRepName,
            SUM(st.totalAmount) AS totalSales
        FROM 
            salesreps sr
        JOIN 
            dailysalesplanningss dsp ON sr.id = dsp.salesRepId
        JOIN 
            invoicess i ON dsp.id = i.dailySalesPlanningId
        JOIN 
            sales_transactions st ON i.id = st.invoiceId
        GROUP BY 
            sr.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching sales achievements:', err);
            return res.status(500).json({ error: 'Database error while fetching sales achievements' });
        }
// Log the result in the console
//console.log('Sales Reps Achievements:', results);

        // Return the sales reps achievements data
        res.json(results);
    });
});

// Fetch product categories with last quantity data
app.get('/api/productcategories', (req, res) => {
    const query = `
        SELECT 
            pc.id AS productCategoryId,
            pc.name AS productCategoryName,
            (SELECT p.quantity FROM products p WHERE p.productCategoryId = pc.id ORDER BY p.id DESC LIMIT 1) AS lastQuantity
        FROM 
            productcategories pc
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching product categories with last quantity:', err);
            return res.status(500).json({ error: 'Database error while fetching product categories with last quantity' });
        }

        // Return the product categories with last quantity data
        console.log('Product Categories with Last Quantity:', results);
        res.json(results);
    });
});


// Update product quantity endpoint
app.put('/api/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const { purchaseQuantity} = req.body;
     
// Query to get the current quantity from the products table
const getCurrentQuantityQuery = `SELECT quantity FROM products WHERE id = ?`;
const productValues = [productId];

// Start a transaction to ensure data integrity
db.beginTransaction((transactionError) => {
  if (transactionError) {
    console.error('Transaction error:', transactionError);
    res.status(500).send({ message: 'Transaction error' });
    return;
  }

  // Get the current quantity of the product
  db.query(getCurrentQuantityQuery, productValues, (error, results) => {
    if (error) {
      console.error('Error retrieving current product quantity:', error);
      db.rollback(() => {
        res.status(500).send({ message: 'Error retrieving product quantity' });
      });
      return;
    }

    if (results.length === 0) {
      console.error('Product not found:', productId);
      db.rollback(() => {
        res.status(404).send({ message: 'Product not found' });
      });
      return;
    }

    const currentQuantity = results[0].quantity;
    const newQuantity = parseInt(currentQuantity, 10) + parseInt(purchaseQuantity, 10); 

    // Update the product with the new quantity
    const updateProductQuery = `UPDATE products SET quantity = ? WHERE id = ?`;
    const updateProductValues = [newQuantity, productId];

    db.query(updateProductQuery, updateProductValues, (updateError, updateResults) => {
      if (updateError) {
        console.error('Error updating product quantity:', updateError);
        db.rollback(() => {
          res.status(500).send({ message: 'Error updating product quantity' });
        });
        return;
      }

      // Insert the purchase record after updating the product quantity
      const insertPurchaseQuery = `INSERT INTO purchase (product_id, quantity, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())`;
      const insertPurchaseValues = [productId, purchaseQuantity];

      db.query(insertPurchaseQuery, insertPurchaseValues, (purchaseError, purchaseResults) => {
        if (purchaseError) {
          console.error('Error inserting purchase record:', purchaseError);
          db.rollback(() => {
            res.status(500).send({ message: 'Error inserting purchase record' });
          });
          return;
        }

        // Commit the transaction if both queries succeed
        db.commit((commitError) => {
          if (commitError) {
            console.error('Error committing transaction:', commitError);
            db.rollback(() => {
              res.status(500).send({ message: 'Error committing transaction' });
            });
            return;
          }

          res.send({ message: 'Product quantity updated and purchase recorded successfully' });
        });
      });
    });
  });
});

    } catch (error) {
      console.error('Error updating product quantity:', error);
      res.status(500).send({ message: 'Error updating product quantity' });
    }
  });

  app.post('/api/sales_targets', (req, res) => {
    const targets = req.body; // Expecting an array of target objects

    // Prepare the SQL statement
    const sql = `
        INSERT INTO sales_target (salesrep_id, target_amount, year, month, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

    // Use a transaction for batch insert
    db.beginTransaction((err) => {
        if (err) return res.status(500).json({ message: 'Transaction error', error: err.message });

        // Array to hold promises for each insert operation
        const insertPromises = targets.map(target =>
            new Promise((resolve, reject) => {
                db.query(sql, [target.salesrep_id, target.target_amount, target.year, target.month], (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                });
            })
        );

        // Execute all inserts
        Promise.all(insertPromises)
            .then(() => {
                db.commit((commitErr) => {
                    if (commitErr) return res.status(500).json({ message: 'Commit error', error: commitErr.message });
                    res.status(201).json({ message: 'Monthly sales targets created successfully!' });
                });
            })
            .catch((queryErr) => {
                db.rollback(() => {
                    res.status(500).json({ message: 'Error inserting sales targets', error: queryErr.message });
                });
            });
    });
});

// Route to get all sales targets
app.get('/api/sales_targets', (req, res) => {
    const sql = `SELECT salesrep_id, target_amount FROM sales_target`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching sales targets', error: err.message });
        }
        res.status(200).json(results);
    });
});

// API endpoint to get company sales report
app.get('/api/company-sales', (req, res) => {
    const query = `
        SELECT 
            DATE_FORMAT(sale_date, '%Y-%m') AS month,  -- Format date to year-month
            SUM(total_amount) AS totalSales
        FROM 
            sales
        GROUP BY 
            month
        ORDER BY 
            month ASC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching sales data:', err);
            return res.status(500).json({ message: 'Error fetching sales data', error: err.message });
        }

        // Send the sales data as JSON
        res.status(200).json(results);
    });
});

// DELETE product from invoice and update the products table
app.delete('/api/salestransactions/:invoiceId/product/:productId', (req, res) => {
    const { invoiceId, productId } = req.params;

    // Step 1: Delete product from salestransactions
    const deleteSql = `
        DELETE FROM salestransactions 
        WHERE invoiceId = ? AND productId = ?
    `;

    db.query(deleteSql, [invoiceId, productId], (err, deleteResult) => {
        if (err) {
            console.error('Error deleting product from salestransactions:', err);
            return res.status(500).json({ message: 'Error deleting product from invoice' });
        }

        if (deleteResult.affectedRows > 0) {
            // Step 2: If deletion is successful, update the products table (e.g., increase quantity in stock)
            const updateSql = `
                UPDATE products 
                SET quantity = quantity + 1 
                WHERE id = ?
            `;

            db.query(updateSql, [productId], (err, updateResult) => {
                if (err) {
                    console.error('Error updating product quantity:', err);
                    return res.status(500).json({ message: 'Error updating product in products table' });
                }

                return res.status(200).json({ message: 'Product removed from invoice and products table updated successfully' });
            });
        } else {
            return res.status(404).json({ message: 'Product not found in invoice' });
        }
    });
});



// Use a single app.listen() method to start the server on port 5000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
