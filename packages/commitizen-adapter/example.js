
// If you havent already, install the [Commitizen Cli](commitizen/cz-cli) tools:
console.log('bash', 'npm install commitizen -g')
// Initialize your project to use the adapter by typing:
console.log('bash', 'commitizen init @hnp/cz')
// The command will initialize the adapter and add the following to your `package.json`
console.log('json', JSON.stringify({ config: { commitizen: { path: "@hnp/cz" } } }))
// Now, can use `git cz` instead of `git commit`.
// > Pro TIP: set as default adapter for your projects
console.log('bash', `npm install --global @hnp/cz && echo '{ "path": "@hnp/cz" }' > ~/.czrc`)
// #### Customization
// You can customize the `scopes` on a project basis by adding a configuration section in your `package.json`:
console.log('json', JSON.stringify({ config: { scopes: ["home", "accounts", "ci"] } })
