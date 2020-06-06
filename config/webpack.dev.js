const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js'
    },
    resolve:{
        extensions: ['.js', '.json','.css','.scss']
    },
    devtool: 'inline-source-map',//bundle.js错误跟踪
    module:{},
    plugins:[
        new htmlPlugin({
            chunks:'index',
            filename: 'index.html',
            template: 'src/index.html'
        })
    ],
    devServer:{
        contentBase: path.join(__dirname, 'dist'),
        host: '10.0.13.65',
        hot: true,
        inline: true,
        compress: true,//一切服务都启用 gzip 压缩
        open: true,
        port: 8080
    }
}