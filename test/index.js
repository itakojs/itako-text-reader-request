// dependencies
import assert from 'assert';
import Itako from 'itako';

// target
import ItakoTextTransformerRequest from '../src';

// helper
const transform = (text, data = {}, options = {}) => {
  const transformer = new ItakoTextTransformerRequest;
  const itako = new Itako([], [transformer])
    .setOption('transformers.request.options', options);
  return itako.transform(text, data);
};

// specs
describe('ItakoTextTransformerRequest', () => {
  describe('basic token modifying', () => {
    it('should convert all of the text token to audio request', () => {
      const actualTokens = transform('greeting');
      const expectedTokens = [{
        type: 'audio',
        value: {
          method: 'GET',
          url: 'greeting',
        },
        options: {},
        meta: {
          transformer: {
            name: 'request',
            options: {},
            type: 'text',
          },
        },
      }];
      assert.deepEqual(actualTokens, expectedTokens);
    });

    it('should ignore unless text token', () => {
      const transformer = new ItakoTextTransformerRequest;
      const audioToken = Itako.createToken('audio', 'foo');

      const actualTokens = transformer.transform([audioToken]);
      const expectedTokens = [Itako.createToken('audio', 'foo')];
      assert.deepEqual(actualTokens, expectedTokens);
    });

    it('should convert the token option to parameters of the request', () => {
      const text = 'greeting';
      const textOptions = {
        pitch: 2,
        volume: 0.5,
      };

      const actualTokens = transform(text, textOptions);
      const expectedTokens = [{
        type: 'audio',
        value: {
          url: 'greeting?pitch=2&volume=0.5',
          method: 'GET',
        },
        options: {},
        meta: {
          transformer: {
            name: 'request',
            options: {},
            type: 'text',
          },
        },
      }];
      assert.deepEqual(actualTokens, expectedTokens);
    });
  });

  describe('use transformerOptions', () => {
    it('if specify method, should change the request method', () => {
      const actualTokens = transform('greeting', {}, {
        method: 'POST',
      });
      assert(actualTokens[0].value.method === 'POST');
    });

    it('if specify baseUrl, should use as url prefix', () => {
      const actualTokens = transform('はろわ', {}, {
        baseUrl: 'https://api.voicetext.jp/v1/tts?text=',
      });
      assert(actualTokens[0].value.url === 'https://api.voicetext.jp/v1/tts?text=%E3%81%AF%E3%82%8D%E3%82%8F');
    });

    it('if specify textAs, it should define a token value as a url parameter', () => {
      const actualTokens = transform('greeting', {}, {
        textAs: 'text',
      });
      assert(actualTokens[0].value.url === '?text=greeting');
    });

    it('if specify defaults, it should define a token default values', () => {
      const actualTokens = transform('greeting', {}, {
        defaults: {
          data: {
            speaker: 'hikari',
          },
        },
      });
      assert(actualTokens[0].value.url === 'greeting?speaker=hikari');
    });

    it('if specify beforeTransform, it should call as an function before transform', () => {
      const actualTokens = transform('greeting', {
        volume: 1,
      }, {
        beforeTransform(token) {
          const opts = Object.assign({}, token.options);
          opts.volume = token.options.volume * 100;
          token.setOptions(opts);
        },
      });
      assert(actualTokens[0].value.url === 'greeting?volume=100');
    });

    it('use all of the above-mentioned options', () => {
      const text = 'greeting';
      const textOptions = {
        pitch: 2,
        volume: 0.5,
      };
      const transformerOptions = {
        method: 'POST',
        baseUrl: 'https://api.voicetext.jp/v1/tts',
        textAs: 'text',
        defaults: {
          data: {
            speaker: 'hikari',
          },
          auth: {
            username: 'APIKEY',
            password: '',
          },
        },
        beforeTransform(token) {
          const opts = {};
          opts.pitch = token.options.pitch * 100;
          opts.volume = token.options.volume * 100;
          return token.setOptions(opts);
        },
      };

      const actualTokens = transform(text, textOptions, transformerOptions);
      const expectedTokens = [{
        type: 'audio',
        value: {
          url: 'https://api.voicetext.jp/v1/tts',
          method: 'POST',
          data: {
            text: 'greeting',
            pitch: 200,
            volume: 50,
            speaker: 'hikari',
          },
          auth: {
            username: 'APIKEY',
            password: '',
          },
        },
        options: {},
        meta: {
          transformer: {
            name: 'request',
            options: {},
            type: 'text',
          },
        },
      }];
      assert.deepEqual(actualTokens, expectedTokens);
    });
  });
});
