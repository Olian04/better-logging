//@ts-check
const { expect } = require('chai');
const { DefaultConfig, resolveConfig } = require('../../dist/lib/config');

describe('Config', () => {
  it('Undefined Format Function', () => {
    const config = resolveConfig({
      format: undefined,
    });

    expect(config.format).to.equal(DefaultConfig.format);
  });

  it('Null Format Function', () => {
    const config = resolveConfig({
      format: null,
    });

    expect(config.format).to.equal(DefaultConfig.format);
  });
});
