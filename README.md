# Mayflower Blocks

This plugin contains block editor blocks for the following Bellevue College themes:
1. Mayflower G4 - *Globals 4*
2. BC "Douglas Fir" theme (in development) - *Globals 4*
3. Bellevue College OHO theme (in development) - *Bootstrap 5*

Most of these are implementations of Bootstrap 4 or 5 components.

## Project Structure

All blocks are in folders under the `src` directory. Each block has its own folder, and each folder contains the block's source code.

NPM is used for package management. To install all dependencies, run the following command from the root directory:

```bash
npm install
```

This project uses [wordpress-scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/) compile/transpile code and build blocks. To watch for changes and build blocks, run the following commands from the root directory:

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

Each block has a folder within `src/` that contains the block's source code, and a folder within `build/` that contains the block's build artifacts (not committed to the repository).

Within the block folder, there is a `block.json` file that contains the block's metadata, and defines its attributes. There is also an `index.js` file that contains the block's implementation. This draws in the other .js files in the `src/` folder.

There are also two Sass files: `style.scss` and `editor.scss`. These are the styles for the block in the front-end and the editor, respectively.

Any PHP files are included in the Source file.

## CI/CD Status:
**Dev:** [![Build Status](https://dev.azure.com/bcintegration/Mayflower%20Blocks/_apis/build/status/Mayflower%20Blocks?branchName=dev)](https://dev.azure.com/bcintegration/Mayflower%20Blocks/_build/latest?definitionId=31&branchName=dev)
**Trunk:** [![Build Status](https://dev.azure.com/bcintegration/Mayflower%20Blocks/_apis/build/status/Mayflower%20Blocks?branchName=trunk)](https://dev.azure.com/bcintegration/Mayflower%20Blocks/_build/latest?definitionId=31&branchName=trunk)

## Suggested Commit Style
[![emoji-log](https://cdn.rawgit.com/ahmadawais/stuff/ca97874/emoji-log/flat.svg)](https://github.com/ahmadawais/Emoji-Log/)


