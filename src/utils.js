export const foreach = (array, cb) => {

  for (let i = 0, length = array.length; i < length; i += 1) {

    cb(array[i], i);

  }

};
