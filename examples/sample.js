/* eslint-disable no-console */

const { VMark } = require('../');

const parsed = new VMark(
  `# Rama
  Rama is the son of King Dasaratha.
  ## Wife
  Rama's wife is sita.`
);

console.log(parsed);
