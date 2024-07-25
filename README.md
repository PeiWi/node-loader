### 原 Repositry https://github.com/smt116/node-native-ext-loader

在 Electron 重整後，會導致讀取路徑跑掉
此為修正版，可正常重整 Electron 應用程式


### Usage example

    {
        test: /\.node$/,
        use: {
            loader: path.resolve(__dirname, './node-loader.js'),
            options: {
                rewritePath:
                    process.env.NODE_ENV !== 'production'
                        ? process.platform === 'linux'
                            ? 'kx906_sdk_electron/bin_linux'
                            : process.platform === 'darwin'
                            ? 'kx906_sdk_electron/bin_darwin'
                            : './kx906_sdk_electron/bin_win32'
                        : process.platform === 'linux'
                        ? './../kx906_sdk_electron/bin_linux'
                        : process.platform === 'darwin'
                        ? '../kx906_sdk_electron/bin_darwin'
                        : './../kx906_sdk_electron/bin_win32',
                },
            }
    },
