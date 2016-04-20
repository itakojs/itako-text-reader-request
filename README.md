Itako Text Transformer Request
---

<p align="right">
  <a href="https://npmjs.org/package/itako-text-transformer-request">
    <img src="https://img.shields.io/npm/v/your-module-name.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/itakojs/itako-text-transformer-request">
    <img src="http://img.shields.io/travis/itakojs/itako-text-transformer-request.svg?style=flat-square">
  </a>
  <a href="https://ci.appveyor.com/project/59naga/itako-text-transformer-request">
    <img src="https://img.shields.io/appveyor/ci/59naga/itako-text-transformer-request.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/itakojs/itako-text-transformer-request/coverage">
    <img src="https://img.shields.io/codeclimate/github/itakojs/itako-text-transformer-request.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/itakojs/itako-text-transformer-request">
    <img src="https://img.shields.io/codeclimate/coverage/github/itakojs/itako-text-transformer-request.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/itakojs/itako-text-transformer-request">
    <img src="https://img.shields.io/gemnasium/itakojs/itako-text-transformer-request.svg?style=flat-square">
  </a>
</p>

Installation
---
```bash
npm install itako-text-transformer-request --save
```

Usage
---

to convert the token to the parameter of [axios](https://github.com/mzabriskie/axios#request-config). request-token is available in [audio-reader](https://github.com/itakojs/itako-audio-reader-audio-context), [etc](https://www.npmjs.com/browse/keyword/itako-audio-reader).

```html
<script src="https://npmcdn.com/itako"></script>
<script src="https://npmcdn.com/itako-audio-reader-audio-context"></script>
<script src="https://npmcdn.com/itako-text-transformer-request"></script>
<script>
var reader = new ItakoAudioReaderAudioContext();
var transformer = new ItakoTextTransformerRequest('text', {
  baseUrl: 'http://voicetext.berabou.me/',
  toType: 'audio',
});
var itako = new Itako([reader], [transformer]);

// audio reader say "konton ji yonoiko"
itako.read('こんとんじょのいこ');
</script>
```

Development
---
Requirement global
* NodeJS v5.10.0
* Npm v3.8.3

```bash
git clone https://github.com/itakojs/itako-text-transformer-request
cd your-module-name
npm install

npm test
```

License
---
[MIT](http://59naga.mit-license.org/)
