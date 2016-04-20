/**
* @module ItakoTextTransformerRequest
* @returns {object} output
*/
export default class ItakoTextTransformerRequest {
  constructor(type = 'text', options = {}) {
    this.name = 'request';
    this.type = type;
    this.options = options;
  }

  transform(tokens, requestOptions = {}) {
    const opts = Object.assign({
      baseUrl: '',
      textAs: '',
      defaults: {},
      toType: 'audio',
    }, requestOptions, this.options);

    return tokens.map((token) => {
      if (token.type !== this.type) {
        return token;
      }

      let sourceToken = token;
      if (opts.beforeTransform) {
        const result = opts.beforeTransform(token, opts);
        if (result === false) {
          return token;
        }
        if (result instanceof token.constructor) {
          sourceToken = result;
        }
      }

      const method = opts.method || 'GET';
      const text = sourceToken.value;
      const data = Object.assign({}, opts.defaults.data, sourceToken.options);
      let url = opts.baseUrl;
      if (opts.textAs.length) {
        data[opts.textAs] = text;
      } else {
        url += text;
      }

      const value = Object.assign({}, opts.defaults, {
        method,
        url,
        data,
      });
      return new sourceToken.constructor(opts.toType, value, {}, { transformer: this });
    });
  }
}
