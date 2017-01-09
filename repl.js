import 'reify/repl';
import 'babel-polyfill';
import 'isomorphic-fetch';
import REPL from 'repl';
import replPromised from 'repl-promised';
import history from 'repl.history';

const babel = require('babel-core');

function preprocess(input) {
  const awaitMatcher = /^(?:\s*(?:(?:let|var|const)\s)?\s*([^=]+)=\s*|^\s*)(await\s[\s\S]*)/;
  const asyncWrapper = (code, binder) => {
    let assign = binder ? `global.${binder} = ` : '';
    return `(function(){ async function _wrap() { return ${assign}${code} } return _wrap();})()`;
  };

  // match & transform
  const match = input.match(awaitMatcher);
  if (match) {
    input = `${asyncWrapper(match[2], match[1])}`;
  }
  return input;
}

function myEval(cmd, context, filename, callback) {
  const code = babel.transform(preprocess(cmd), {
    presets: ['es2015', 'stage-0'],
  }).code;
  _eval(code, context, filename, callback);
}

let _eval;

(async() => {
  try {
    let repl = REPL.start({
      prompt: '> ',
    });

    _eval = repl.eval;
    repl.eval = myEval;

    // repl.context.

    history(repl, `${process.env.HOME}/.node_history`);

    replPromised.promisify(repl);
  } catch (error) {
    console.error('error: ', error);
    process.exit(1);
  }
})();


