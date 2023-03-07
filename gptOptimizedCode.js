const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanets(planet) {
  return (
    // from keplers_data
    
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

  
