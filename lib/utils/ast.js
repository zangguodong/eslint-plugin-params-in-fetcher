function isFetcherProperty(node) {
    return node.key.type === 'Identifier' && node.key.name === 'fetcher'
}

function isArrowFunction(node) {
    return node.type === 'ArrowFunctionExpression'
}

function isObjectPattern(node) {
    return node.type === 'ObjectPattern'
}

module.exports = {
    isFetcherProperty, isArrowFunction, isObjectPattern,
}