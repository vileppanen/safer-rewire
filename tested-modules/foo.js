const zoo = () => 'zoo'

const foo = () => {
  const zooMessage = zoo()
  const barMessage = bar() // Should fail miserably
  return `foo${zooMessage}${barMessage}`
}

module.exports = { foo }
