const remark = require('remark')
const fs = require('fs')
const plugin = require('../src/index')

const processMarkdown = async (md) => {
  return remark().use(plugin).process(md)
}

test('it adds an error when there are no examples', async () => {
  let markdown = fs.readFileSync('./test/two_commands_no_examples.md', 'utf8')

  const lint = await processMarkdown(markdown)
  expect(lint.messages.length).toBe(2)
  expect(lint.messages[0].message).toBe('Command has no usage example')
})
test('it does not add error messages when one is present', async () => {
  let markdown = fs.readFileSync('./test/command_with_example.md', 'utf8')

  const lint = await processMarkdown(markdown)
  expect(lint.messages.length).toBe(0)
})
