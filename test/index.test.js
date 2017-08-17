const remark = require('remark')
const fs = require('fs')
const plugin = require('../src/index')

const processMarkdown = async (md) => {
  return remark().use(plugin).process(md)
}

let markdown = null
beforeAll(() => {
  markdown = fs.readFileSync('./test/generated_docs.md', 'utf8')
})

test('it adds an error when there are no examples', async () => {
  markdown = fs.readFileSync('./test/two_commands_no_examples.md', 'utf8')

  const lint = await processMarkdown(markdown)
  expect(lint.messages.length).toBe(2)
  expect(lint.messages[0].message).toBe('Command has no usage example')
})
test('it does not add error messages when one is present', async () => {
  markdown = fs.readFileSync('./test/command_with_example.md', 'utf8')

  const lint = await processMarkdown(markdown)
  expect(lint.messages.length).toBe(0)
})
