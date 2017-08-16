const visit = require('unist-util-visit')
const is = require('unist-util-is')

const attacher = () => {
  const transformer = (tree, file) => {
    const visitor = (node) => {
      var children = node.children

      children.forEach(function (child, index) {
        if (
          is('SentenceNode', children[index - 1]) &&
          is('WhiteSpaceNode', child) &&
          is('SentenceNode', children[index + 1])
        ) {
          if (child.value.length !== 1) {
            file.message(
              'Expected 1 space between sentences, not ' +
              child.value.length,
              child
            )
          }
        }
      })
    }
    visit(tree, 'ParagraphNode', visitor)
  }
  return transformer
}

module.exports = attacher
