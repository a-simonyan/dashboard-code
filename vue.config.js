const zlib = require("zlib");
module.exports = {
  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(600000).maxAssetSize(600000);
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/assets/styles/main.scss";
          `,
      },
    },
  },
  pluginOptions: {
    compression: {
      brotli: {
        filename: "[file].br[query]",
        algorithm: "brotliCompress",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        minRatio: 0.8,
      },
      gzip: {
        filename: "[file].gz[query]",
        algorithm: "gzip",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      },
    },
  },
};
