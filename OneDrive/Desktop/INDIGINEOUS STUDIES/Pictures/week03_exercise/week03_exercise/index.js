const http = require("http");
const employees = require("./Employee");

console.log("Lab 03 - NodeJs");

// Define Server Port
const port = process.env.PORT || 8081;

// Create Web Server
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');  // Set the header for JSON responses

    if (req.method !== 'GET') {
        res.end(JSON.stringify({ error: http.STATUS_CODES[405] }));
        return;
    }

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Welcome to Lab Exercise 03</h1>');
    } else if (req.url === '/employee') {
        res.end(JSON.stringify(employees));  // Display all employee details
    } else if (req.url === '/employee/names') {
        const names = employees.map(emp => `${emp.firstName} ${emp.lastName}`).sort();  // Sort names
        res.end(JSON.stringify(names));  // Display employee names
    } else if (req.url === '/employee/totalsalary') {
        const totalSalary = employees.reduce((total, emp) => total + emp.Salary, 0);  // Calculate total salary
        res.end(JSON.stringify({ total_salary: totalSalary }));
    } else {
        res.end(JSON.stringify({ error: http.STATUS_CODES[404] }));
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
