// Only reports error when fetcher in K8sResourceList is arrow function, and, no params or param with Object destructured has no restElements
// We think these scenes are very likely to lose Injection params
const { isArrowFunction, isFetcherProperty, isObjectPattern } = require('../utils/ast')

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Use all params to avoid missing injection params,e.g.,continueToken,limit',
            recommended: false,
            url: 'https://confluence.alauda.cn/pages/viewpage.action?pageId=152641419', // URL to the documentation page for this rule
        },
        fixable: null,
        schema: [], // Add a schema if the rule has options
    },
    create: function(context) {
        function reportError(node) {
            context.report({
                node: node,
                message: "Enforce all params in fetcher to carry injection ones!",
            })
        }

        return {
            'NewExpression[callee.name="K8SResourceList"] Property': function(node) {
                if (isFetcherProperty(node) && isArrowFunction(node.value)) {
                    // Only need examine first params
                    const param = node.value.params?.[0]
                    // only report error when no params, or no restElements in object
                    if (!param) {
                        return void reportError(node)
                    }
                    if (isObjectPattern(param) && !param.properties.some(p => p.type === 'RestElement')) {
                        reportError(node)
                    }
                }
            },
        }
    },
}