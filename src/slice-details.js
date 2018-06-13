import { sliceList } from './slice-list';

export const getSliceDetails = slice => {

  const sliceDetails = sliceList[slice];

  if (sliceDetails) {

    return Object.assign({},

      sliceDetails,

      {
        slice,
        type: 'marker'
      }
    );

  }

  return {
    role: 'none',
    slice,
    type: 'unknown'
  };

};

export const getMaxTokenLength = () => {

  const minTokenLength = 1;
  const tokenLengths = [minTokenLength];

  Object.keys(sliceList).forEach(key =>

    tokenLengths.push(key.length)

  );

  return Math.max(...tokenLengths);

};
