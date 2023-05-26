/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');

module.exports = function override(config) {
  config.ignoreWarnings = [/Failed to parse source map/];
  config.resolve.fallback = {
    url: false,
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream-browserify'),
    fs: false,
    tls: false,
    net: false,
    path: false,
    zlib: false,
    http: false,
    https: false,
    crypto: false,
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  config.target = ['web'];

  return config;
};
