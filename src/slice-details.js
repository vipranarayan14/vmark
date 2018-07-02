import { markersList } from './markers-list';

export const getSliceDetails = slice => {

  const sliceDetails = markersList[slice];

  if (sliceDetails) {

    return Object.assign({},

      sliceDetails,

      {
        type: 'marker',
        value: slice
      }
    );

  }

  return {
    role: 'none',
    type: 'unknown',
    value: slice
  };

};
