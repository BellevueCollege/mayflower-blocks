# Mayflower Blocks

This plugin contains block editor blocks for the Mayflower G4 Theme. 
Most of these are implementations of Bootstrap 4 components.

## Project Structure
Each block is a separate NPM package, found in a top-level folder named after the block.

You can install all NPM packages from the root level with the following command:

```bash
npm install
```

This project uses [Lerna](https://lerna.js.org/) to distribute commands to submodules. Run the following commands from the root directory to build or watch all submodules:

```bash
# Watch for changes:
npm start

# Build all blocks:
npm run build
```

## Block Structure

### Registration
Each block is registered in the main `plugin.php` file. You can register a new block by adding the folder name to the array of registered blocks.

### Block Structure
Each block has a `package.json` file that contains the block's metadata and required packages.

Each block has a `src/` folder that contains the block's source code, and a `build/` folder that contains the block's build artifacts (not committed to the repository).

Within the `src/` folder, there is a `block.json` file that contains the block's metadata, and defines its attributes. There is also an `index.js` file that contains the block's implementation. This draws in the other .js files in the `src/` folder.

There are also two Sass files: `style.scss` and `editor.scss`. These are the styles for the block in the front-end and the editor, respectively.




