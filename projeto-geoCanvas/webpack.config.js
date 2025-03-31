const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // Modo de compilação (development, production ou none)
  mode: 'development',
  
  // Arquivo de entrada principal
  entry: './src/js/index.js',
  
  // Configurações de saída
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // Limpa o diretório de saída antes de cada build
  },
  
  // Servidor de desenvolvimento
  devServer: {
    static: './dist',
    hot: true, // Habilita o Hot Module Replacement
    port: 3000,
    open: true // Abre o navegador automaticamente
  },
  
  // Configurações para o modo de desenvolvimento
  devtool: 'source-map',
  
  // Módulos e loaders
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      
      // CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extrai CSS para arquivos separados
          'css-loader' // Processa @import, url() etc
        ]
      },
      
      // Imagens
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]'
        }
      },
      
      // Fontes
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]'
        }
      }
    ]
  },
  
  // Plugins
  plugins: [
    // Gera o HTML final com o bundle injetado
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    
    // Extrai CSS para arquivos separados
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    }),
    
    // Copia arquivos estáticos para o diretório de saída
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'src/assets', 
          to: 'assets',
          noErrorOnMissing: true
        }
      ]
    })
  ],
  
  // Otimizações para produção
  optimization: {
    splitChunks: {
      chunks: 'all' // Separa o código de terceiros para melhor cache
    }
  },
  
  // Configurações de resolução de módulos
  resolve: {
    extensions: ['.js', '.json'] // Extensões que podem ser omitidas na importação
  }
};
