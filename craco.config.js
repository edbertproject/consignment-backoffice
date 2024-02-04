const CracoLessPlugin = require("craco-less");

module.exports = {
  devServer: {
    port: 3003,
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#00649a",
            },
            javascriptEnabled: true,
          },
        },
        babelPluginImportOptions: {
          libraryDirectory: "es",
        },
      },
    },
  ],
};
