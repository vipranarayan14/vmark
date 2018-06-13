import { getMaxTokenLength, getSliceDetails } from './slice-details';
import { convertTokens } from './convert-tokens';
import { vTokenize } from 'vtokenize';

export class VMark {

  constructor(str) {

    const tokens = vTokenize(
      str,
      getMaxTokenLength(),
      getSliceDetails
    );

    const convertedTokens = convertTokens(tokens);

    return convertedTokens.join('');

  }

}
