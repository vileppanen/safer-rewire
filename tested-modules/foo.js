const zoo = () => 'zoo'

const foo = () => {
  const zooMessage = zoo()
  /* eslint no-undef: */
  const barMessage = bar() // Should fail miserably
  return `foo${zooMessage}${barMessage}`
}

module.exports = { foo }
