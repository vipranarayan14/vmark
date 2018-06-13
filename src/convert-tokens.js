import { foreach } from './utils';

const HtmlTagList = {

  heading1: {
    closeTag: '</h1>',
    openTag: '<h1>'
  },

  heading2: {
    closeTag: '</h2>',
    openTag: '<h2>'
  },

  paragraph: {
    closeTag: '</p>',
    openTag: '<p>'
  }

};

/* eslint-disable complexity */
export const convertTokens = tokens => {

  const convertedTokens = [];

  let openedTag = '';

  foreach(tokens, token => {

    if (token.type === 'marker') {

      const tag = HtmlTagList[token.role];

      if (tag) {

        if (openedTag) {

          convertedTokens.push(HtmlTagList[openedTag].closeTag);
          openedTag = '';

        }

        convertedTokens.push(tag.openTag);
        openedTag = token.role;

      }

    } else {

      if (token.slice === '\n' && openedTag && openedTag !== 'paragraph') {

        convertedTokens.push(HtmlTagList[openedTag].closeTag);
        openedTag = '';

      }

      if (!openedTag) {

        convertedTokens.push(HtmlTagList.paragraph.openTag);
        openedTag = 'paragraph';

      }

      if (token.slice !== '\n') {

        convertedTokens.push(token.slice);

      }

    }

  });

  convertedTokens.push(HtmlTagList[openedTag].closeTag);
  openedTag = '';

  return convertedTokens;

};
