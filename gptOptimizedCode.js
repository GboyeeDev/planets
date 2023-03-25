const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanets(planet) {
  return (
    // from keplers_data
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

const transform = (record) => {
  if (isHabitablePlanets(record)) {
    console.log(record)
    return record;
  }
};

fs.createReadStream('kepler_data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
      transform: transform,
    })
  )
  .on('data', (data) => {
    habitablePlanets.push(data);
  })
  .on('end', () => {
    for (const planet of habitablePlanets) {
      console.log(planet);
    }
    console.log(`${habitablePlanets.length} habitable planets found! `);
  });

  

