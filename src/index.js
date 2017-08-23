const rule = require('unified-lint-rule')
const visit = require('unist-util-visit')
const visitAllAfter = require('./visit_all_after')

async function commandsHaveExamples (ast, file) {
  let headingFound = false
  let exampleFound = false

  const headingOrExample = async (subNode, index) => {
    if (exampleFound || headingFound) return
    if (subNode.depth === 3 && index !== 0) headingFound = true
    if (subNode.depth === 4 && subNode.children[0].value.includes('Example')) exampleFound = true
  }

  const validate = async (node) => {
    if (node.depth !== 3) return
    headingFound = false
    exampleFound = false

    visitAllAfter(ast, node, 'heading', headingOrExample)
    if (exampleFound === false) { file.message('Command has no usage example', node) }
  }

  await visit(ast, 'heading', validate)
}

module.exports = rule('remark-lint:commands-have-examples', commandsHaveExamples)
