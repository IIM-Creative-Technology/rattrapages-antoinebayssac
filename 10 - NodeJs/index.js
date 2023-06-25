const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let restaurants = [];
let currentId = 0;

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Créer un restaurant
app.post('/restaurant', (req, res) => {
    if (!req.body.name || typeof req.body.name !== 'string') {
        return res.status(400).json({ error: 'Le nom est requis et doit être une chaîne' });
    }
    if (!req.body.address || typeof req.body.address !== 'string') {
        return res.status(400).json({ error: 'L\'adresse est requise et doit être une chaîne' });
    }
    if (!req.body.postalCode || typeof req.body.postalCode !== 'string' || !/^\d+$/.test(req.body.postalCode)) {
        return res.status(400).json({ error: 'Le code postal est requis et doit être une chaîne contenant uniquement des chiffres' });
    }
    if (req.body.seatingCapacity === undefined || typeof req.body.seatingCapacity !== 'string' || !/^\d+$/.test(req.body.seatingCapacity)) {
        return res.status(400).json({ error: 'La capacité d\'accueil est requise et doit être une chaîne contenant uniquement des chiffres' });
    }

    const newRestaurant = {
        id: currentId++,
        name: req.body.name,
        address: req.body.address,
        postalCode: req.body.postalCode,
        seatingCapacity: req.body.seatingCapacity
    };

    restaurants.push(newRestaurant);
    res.status(201).json(newRestaurant);
});

// Modifier un restaurant
app.put('/restaurant/:id', (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const restaurant = restaurants.find(restaurant => restaurant.id === restaurantId);

    if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant non trouvé' });
    }

    restaurant.name = req.body.name || restaurant.name;
    restaurant.address = req.body.address || restaurant.address;
    restaurant.postalCode = req.body.postalCode || restaurant.postalCode;
    restaurant.seatingCapacity = req.body.seatingCapacity || restaurant.seatingCapacity;

    res.status(200).json(restaurant);
});

// Supprimer un restaurant
app.delete('/restaurant/:id', (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const index = restaurants.findIndex(restaurant => restaurant.id === restaurantId);

    if (index === -1) {
        return res.status(404).json({ message: 'Restaurant non trouvé' });
    }

    restaurants.splice(index, 1);
    res.status(200).json({ message: 'Restaurant supprimé avec succès' });
});

// Récupérer tous les restaurants
app.get('/restaurant', (req, res) => {
    res.status(200).json(restaurants);
});

// Récupérer un restaurant spécifique   
app.get('/restaurant/:id', (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const restaurant = restaurants.find(restaurant => restaurant.id === restaurantId);

    if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant non trouvé' });
    }

    res.status(200).json(restaurant);
});
