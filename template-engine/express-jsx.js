
const fs = require('fs')    // To read the content of the callback

function getKeysFromOptions(options) {
    const { settings, _locals, ...objectKeys } = options
    return Object.keys(objectKeys)
}

function getRenderedContent(content, options) {
    const keys = getKeysFromOptions(options)
    let contentString = content.toString()  // Content is Binary

    for (let key of keys) {
        // Replace each word inside a curly bracket by the key. g: global & i: insensitive case
        contentString = contentString.replace(new RegExp(`\{${key}}`, "gi"), options[key])   // replace (this, by this)
    }
    return contentString
}

function expressJsx(filePath, options, callback) {
    fs.readFile(filePath, function(err, content) {
        if (err) {
            return callback(err)
        }

        const rendered = getRenderedContent(content, options)
        return callback(null, rendered)
    })
}

module.exports = expressJsx