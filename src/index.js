import { convertTokens } from './convert-tokens';
import { makeTokens } from './make-tokens';
import { parseTokens } from './parse-tokens';

export class VMark {

  constructor(str) {

    const tokens = makeTokens(str);

    const ast = parseTokens(tokens);

    const convertedTokens = convertTokens(ast);

    return convertedTokens.join('');

  }

}
