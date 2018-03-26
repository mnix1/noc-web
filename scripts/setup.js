const fs = require('fs');
const path = require('path');

let file = path.resolve('./node_modules/babel-preset-react-app/index.js');
let text = fs.readFileSync(file, 'utf8');

if (!text.includes('babel-plugin-relay')) {
    if (text.includes('const plugins = [')) {
        text = text.replace(
            'const plugins = [',
            "const plugins = [\n  require.resolve('babel-plugin-relay'),",
        );
        fs.writeFileSync(file, text, 'utf8');
    } else {
        throw new Error(`Failed to inject babel-plugin-relay.`);
    }
}

function addPostCssPlugins(file){
    text = fs.readFileSync(file, 'utf8');
    if (!text.includes("require('lost'),")) {
        if (text.includes("require('postcss-flexbugs-fixes'),")) {
            text = text.replace(
                "require('postcss-flexbugs-fixes'),",
                "require('postcss-flexbugs-fixes'),require('lost'),require('postcss-cssnext'),",
            );
            fs.writeFileSync(file, text, 'utf8');
        } else {
            throw new Error(`Failed to inject babel-plugin-relay.`);
        }
    }
}
addPostCssPlugins(path.resolve('./node_modules/react-scripts/config/webpack.config.dev.js'));
addPostCssPlugins(path.resolve('./node_modules/react-scripts/config/webpack.config.prod.js'));
