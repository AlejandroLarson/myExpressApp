import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    try{
        let apiKey = "7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e";
    let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index", { "image": randomImage })
    } catch (error) {
        console.error("Unsplash Background API error ", error);
        // fallback for background if api fetch fails
        res.render("index", {"image" : "https://science.nasa.gov/wp-content/uploads/2023/09/stsci-01ga76rm0c11w977jrhgj5j26x-2.png"})
    }

});

app.get('/NASA', async (req, res) => {
    try {
        let nasaApiKey = '9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD';
        let url = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=2025-11-22`;
        let response = await fetch(url);
        let nasaData = await response.json();

        res.render("NASA", { nasaData })
    } catch (error) {
        console.error('NASA API error ', error);
        // I was having an issue where the API was going over the hourly limit
        // so I need to use a fallback image here just in case that happens again
        // this data comes from the link in the lab assignment description

        res.render("NASA", {
            nasaData: {
                explanation: `A great nebulous region near bright star omicron Persei offers this study in cosmic contrasts.  
                Captured in the telescopic frame is a colorful complex of dust, gas, and stars spanning about 3 degrees on the 
                sky along the edge of the Perseus molecular cloud, some 1000 light-years away. Surrounded by a bluish halo of 
                dust-reflected starlight, omicron Persei itself is just left of center. Immediately below it lies the intriguing 
                young star cluster IC 348 recently explored at infrared wavelengths by the James Webb Space Telescope. In silhouette 
                against the diffuse reddish glow of hydrogen gas, dark and obscuring interstellar dust cloud Barnard 3 is at upper right. 
                Of course, the cosmic dust also tends to hide newly formed stars and young stellar objects or protostars from prying optical
                 telescopes. At the Perseus molecular cloud's estimated distance, this field of view would span about 50 light-years.`,
                url: "https://apod.nasa.gov/apod/image/2411/IC348_B3_1024.jpg"
            }
        })
    }
});


app.get('/earth', (req, res) => {
    let planetEarth = planets.getEarth();
    res.render('earth', { planetEarth })
});

app.get('/mars', (req, res) => {
    let planetMars = planets.getMars();
    // need to manually change url because of the way Render builds from packages
    planetMars.image = `https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png/960px-Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png`;
    res.render('mars', { planetMars })
});

app.get('/mercury', (req, res) => {
    let planetMercury = planets.getMercury();
    res.render('mercury', { planetMercury })
});

app.get('/venus', (req, res) => {
    let planetVenus = planets.getVenus();
    res.render('venus', { planetVenus })
});

app.get('/jupiter', (req, res) => {
    let planetJupiter = planets.getJupiter();
    // need to manually change url because of the way Render builds from packages
    planetJupiter.image = `https://science.nasa.gov/wp-content/uploads/2024/03/jupiter-marble-pia22946-16x9-1.jpg`;
    res.render('jupiter', { planetJupiter })
});

app.get('/saturn', (req, res) => {
    let planetSaturn = planets.getSaturn();
    res.render('saturn', { planetSaturn })
});

app.get('/uranus', (req, res) => {
    let planetUranus = planets.getUranus();
    res.render('uranus', { planetUranus })
});

app.get('/neptune', (req, res) => {
    let planetNeptune = planets.getNeptune();
    res.render('neptune', { planetNeptune })
});

app.listen(3000, () => {
    console.log('server started');
});
