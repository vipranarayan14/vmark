import { foreach } from './utils';
import { getSliceDetails } from './slice-details';
import { vTokenize } from 'vtokenize';

const eofToken = {
  role: 'end-of-file',
  type: 'marker',
  value: 'EOF'
};

const addCapturedStringAsToken = (capturedString, refinedTokens) => {

  if (capturedString) {

    refinedTokens.push({
      role: 'content',
      type: 'string',
      value: capturedString
    });

  }

};

// Takes 'unknown' tokens to form 'string' tokens.
const makeStringTokens = tokens => {

  const refinedTokens = [];

  let capturedString = '';

  foreach(tokens, token => {

    if (token.type === 'marker') {

      addCapturedStringAsToken(capturedString, refinedTokens);

      refinedTokens.push(token);

    } else {

      // capture value of 'unknown' tokens to form a single 'string' token.
      capturedString += token.value;

    }

  });

  return refinedTokens;

};

export const makeTokens = str => {

  let tokens = vTokenize(str, 3, getSliceDetails);

  // add 'end-of-file' token to ease processing of tokens in later stages.
  tokens.push(eofToken);

  tokens = makeStringTokens(tokens);

  return tokens;

};
