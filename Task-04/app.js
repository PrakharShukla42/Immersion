const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


let vehicles = [];
let idCounter = 1;


app.get('/', (req, res) => {
    res.render('index', { vehicles });
});


app.get('/vehicles/new', (req, res) => {
    res.render('new');
});


app.post('/vehicles', (req, res) => {
    const { vehicleName, price, image, desc, brand } = req.body;
    vehicles.push({ id: idCounter++, vehicleName, price, image, desc, brand });
    res.redirect('/');
});


app.get('/vehicles/:id/edit', (req, res) => {
    const vehicle = vehicles.find(v => v.id == req.params.id);
    if (vehicle) {
        res.render('edit', { vehicle });
    } else {
        res.send("Vehicle not found");
    }
});


app.post('/vehicles/:id', (req, res) => {
    const { vehicleName, price, image, desc, brand } = req.body;
    const vehicle = vehicles.find(v => v.id == req.params.id);
    if (vehicle) {
        vehicle.vehicleName = vehicleName;
        vehicle.price = price;
        vehicle.image = image;
        vehicle.desc = desc;
        vehicle.brand = brand;
    }
    res.redirect('/');
});


app.post('/vehicles/:id/delete', (req, res) => {
    vehicles = vehicles.filter(v => v.id != req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
