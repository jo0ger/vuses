module.exports =({ config }) => {
  config.resolve.extensions.push('.ts', '.tsx')
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            '@babel/env',
            '@babel/typescript',
            '@vue/jsx'
          ],
        },
      },
    ],
  })
  return config
}
