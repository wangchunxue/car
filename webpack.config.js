
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    index:'./src/index',
    business: './src/business/business',
    customer: './src/customer/index',
    employee: './src/employee/index',
    goods: './src/goods/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
    resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: 'empty'
  },
  performance:{
    hints:false
  },
  module: {
    rules: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      },{
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/, 
        loader: 'style-loader!css-loader'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '汽车维修服务管理公司',
      chunks:['business'],
      filename: 'business.html',
      template: path.resolve(__dirname, 'views/business.ejs')
    }),
     new HtmlWebpackPlugin({
      title: '汽车维修服务管理公司',
      filename: 'customer.html',
      chunks:['customer'],       
      template: path.resolve(__dirname, 'views/customer.ejs')
    }), 
    new HtmlWebpackPlugin({
      title: '汽车维修服务管理公司',
      filename: 'employee.html',
      chunks:['employee'], 
      template: path.resolve(__dirname, 'views/employee.ejs')
    }), 
    new HtmlWebpackPlugin({
      title: '汽车维修服务管理公司',
      filename: 'goods.html',
      chunks:['goods'],      
      template: path.resolve(__dirname, 'views/goods.ejs')
    }), 
    new HtmlWebpackPlugin({
      title: '汽车维修服务管理公司',
      filename: 'index.html',
      chunks:['index'],
      template: path.resolve(__dirname, 'views/index.ejs')
    })
  ]

};
