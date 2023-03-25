const { parse } = require('csv-parse');
const fs = require('fs')

// this array will receive our data.
const habitablePlanets = [];

function isHabitablePlanets(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6;
}


// rading kepler_data as a stream
fs.createReadStream('kepler_data.csv')
    // pipe is the destination of my kepler_data
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanets(data)) {
            habitablePlanets.push(data);
        } 
    })
    .on('error', (err) => {
        console.log(err)
    })
    .on('end', () => {
        // used map method to get the planets name from the data we got earlier
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name'];
        }))
        console.log(`${habitablePlanets.length} habitable planets found! `)
    });



git remote add origin https://github.com/GboyeeDev/emocom.git
git branch -M main
git push -u origin main

