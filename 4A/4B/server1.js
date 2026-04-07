// index.ejs and result.ejs for this js

import express from 'express';
import axios from 'axios';

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index', { response: null });
});


app.post('/data', async (req, res) => {
    const roll = parseInt(req.body.roll);

    
    let result = { text: "", image: null };

    try {
        // Roll 1-9 → Joke API
        if (roll >= 1 && roll <= 9) {
            const response = await axios.get('https://v2.jokeapi.dev/joke/Any');

            if (response.data.type === "single") {
                result.text = response.data.joke;
            } else {
                result.text = `${response.data.setup} ${response.data.delivery}`;
            }
        }

        // Roll 10-18 → Weather API
        else if (roll >= 10 && roll <= 18) {
            const cities = [
                { name: "Mumbai", lat: 19.07, lon: 72.87 },
                { name: "London", lat: 51.50, lon: -0.12 },
                { name: "New York", lat: 40.71, lon: -74.00 },
                { name: "Tokyo", lat: 35.67, lon: 139.65 }
            ];

            const randomCity = cities[Math.floor(Math.random() * cities.length)];

            const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
                params: {
                    latitude: randomCity.lat,
                    longitude: randomCity.lon,
                    daily: "rain_sum",
                    timezone: "auto"
                }
            });

            const rain = response.data.daily.rain_sum[1];
            result.text = `City: ${randomCity.name} | Will it rain tomorrow? ${rain > 0 ? "Yes" : "No"}`;
        }

        // Roll 19-27 → Crypto API
        else if (roll >= 19 && roll <= 27) {
            const response = await axios.get('https://api.blockchain.com/v3/exchange/tickers/BTC-USD');
            result.text = `BTC Price: $${response.data.last_trade_price}`;
        }

        // Roll 28-36 → Cocktail API
        else if (roll >= 28 && roll <= 36) {
            const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            const drink = response.data.drinks[0];

            result.text = `${drink.strDrink} - ${drink.strInstructions}`;
            result.image = drink.strDrinkThumb; // only here image exists
        }

        // Roll outside 1-36
        else {
            result.text = "Roll number not assigned!";
        }

        res.render('result', { roll, result });

    } catch (error) {
        console.error(error.message);
        res.send("Error fetching data");
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});