module.exports = {
  mode: "production",
  entry: "./src/watermark.js",
  output: {
    path: __dirname + "/dist",
    library: "Watermark",
    libraryTarget: "umd",
    umdNamedDefine: true,
    libraryExport: "default",
    filename: "watermarking-js.min.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // 需要兼容到以下浏览器的什么版本
                  targets: {
                    ie: "10",
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                  },
                  // 按需加载
                  useBuiltIns: "usage",
                  // 指定core-js版本 看好了这个地方如果和你安装的包的版本不一样会报错
                  corejs: "3.16.1",
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [],
  target: ["web", "es5"],
};
