module.exports = {
    entry: './src/index.jsx',

    output: {
        filename: 'bundle.js',
        path: './public',
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot-loader!babel-loader',
            },
            {
                test: /\.scss$/, 
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        
        proxy: {
            '/api' : 'http://localhost:3005' // прокси сервер для бэкэнда
        }
    },


    devtool: 'source-map',
    
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};