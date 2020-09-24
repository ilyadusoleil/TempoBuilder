const MAP = ['a', 'b', 'c', 'd', 'e'];

const sessionFactory = (letter, repetitions, percent) => {
  return {
    letter,
    repetitions,
    percent,
  };
};

/**
 * Generate a plan based on the number of sections
 * @param {int} numSections - NUmber of sections within the piece
 */
const GeneratePlan = (numSections) => {
  let res = [];

  for (let i = 0; i < numSections; i++) {
    res.push([sessionFactory(MAP[i], 3, 50)]);
  }
  for (let i = 0; i < numSections; i++) {
    res.push([
      sessionFactory(MAP[i], 1, 75),
      sessionFactory(MAP[(i + 1) % numSections], 2, 65),
      sessionFactory(MAP[(i + 2) % numSections], 3, 55),
    ]);
  }
  for (let i = 0; i < numSections; i++) {
    res.push([
      sessionFactory('all', 1, 100 - ((numSections - i) * 5)),
      sessionFactory(MAP[i], 1, 85),
      sessionFactory(MAP[(i + 1) % numSections], 1, 75),
      sessionFactory(MAP[(i + 2) % numSections], 2, 65),
    ]);
  }

  return res;
};

export default GeneratePlan;
