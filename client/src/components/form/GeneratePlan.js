const sessionFactory = (section, repetitions, percent) => {
  return {
    section,
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
    res.push([sessionFactory(i, 3, 50)]);
  }
  for (let i = 0; i < numSections; i++) {
    res.push([
      sessionFactory(i, 1, 75),
      sessionFactory((i + 1) % numSections, 2, 65),
      sessionFactory((i + 2) % numSections, 3, 55),
    ]);
  }
  for (let i = 0; i < numSections; i++) {
    res.push([
      sessionFactory(-1, 1, 100 - (numSections - i) * 5), //section of -1 is for the entire piece
      sessionFactory(i, 1, 85),
      sessionFactory((i + 1) % numSections, 1, 75),
      sessionFactory((i + 2) % numSections, 2, 65),
    ]);
  }

  return res;
};

export default GeneratePlan;
