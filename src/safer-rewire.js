const keyExists = (rewiredModule, key) => {
  try {
    rewiredModule.__get__(key)
    return true
  } catch (err) {
    return false
  }
}

const getExistingKeys = (rewiredModule, mocks) => {
  const existingKeyValues = Object.entries(mocks).filter(([key]) => keyExists(rewiredModule, key))
  return existingKeyValues.reduce((curr, [nextKey, nextValue]) => {
    return {
      ...curr,
      [nextKey]: nextValue
    }
  }, {})
}

const getReplaceWithFn = rewiredModule => mocks => rewiredModule.__with__(getExistingKeys(rewiredModule, mocks))

const saferRewire = rewire => moduleToRewire => {
  const rewiredModule = rewire(moduleToRewire)

  const __replaceWith__ = getReplaceWithFn(rewiredModule)

  return {
    rewiredModule,
    /**
   * Wrapper for __with__, that strips away mocks that do not exist in the tested module.
   * This ensures that injected mocks are replacing only the existing code, and not injecting additional functionality.
   * @param {object} mocks
   * @returns {func} Resulting function when calling rewiredModule.__with__ with stripped mocks
   */
    __replaceWith__
  }
}

module.exports = saferRewire
