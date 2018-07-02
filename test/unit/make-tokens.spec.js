import { expect } from 'chai';
import { tokenize } from '../../src/tokenize';

describe('Tokenize', () => {

  it('should return a EOF token for an empty string ``', () => {

    expect(tokenize('')).to.deep.equal(
      [

        {
          role: 'end-of-file',
          type: 'marker',
          value: 'EOF'
        }

      ]
    );

  });

  it('should return a marker token for the string `#`', () => {

    expect(tokenize('#')).to.deep.equal(
      [

        {
          role: 'heading1',
          type: 'marker',
          value: '#'
        },

        {
          role: 'end-of-file',
          type: 'marker',
          value: 'EOF'
        }

      ]
    );

  });

  it('should return two marker tokens for the string `# `', () => {

    expect(tokenize('# ')).to.deep.equal(
      [

        {
          role: 'heading1',
          type: 'marker',
          value: '#'
        },

        {
          role: 'space',
          type: 'marker',
          value: ' '
        },

        {
          role: 'end-of-file',
          type: 'marker',
          value: 'EOF'
        }

      ]
    );

  });

  it('should return two marker tokens and a string token for the string `# Ramayana`', () => {

    expect(tokenize('# Ramayana')).to.deep.equal(
      [

        {
          role: 'heading1',
          type: 'marker',
          value: '#'
        },

        {
          role: 'space',
          type: 'marker',
          value: ' '
        },

        {
          role: 'content',
          type: 'string',
          value: 'Ramayana'
        },

        {
          role: 'end-of-file',
          type: 'marker',
          value: 'EOF'
        }

      ]
    );

  });

  it('should not support markers longer than 3 characters', () => {

    expect(tokenize('#### Mahabharata')).to.deep.equal([

      {
        role: 'heading3',
        type: 'marker',
        value: '###'
      },

      {
        role: 'heading1',
        type: 'marker',
        value: '#'
      },

      {
        role: 'space',
        type: 'marker',
        value: ' '
      },

      {
        role: 'content',
        type: 'string',
        value: 'Mahabharata'
      },

      {
        role: 'end-of-file',
        type: 'marker',
        value: 'EOF'
      }

    ]);

  });

});
