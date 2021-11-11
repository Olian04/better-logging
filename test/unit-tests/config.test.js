//@ts-check
const { expect } = require('chai');
const { DefaultConfig, resolveConfig } = require('../../dist/lib/config');

describe('Config', () => {
  describe('Format Function', () => {
    it('should return default when undefined', () => {
      const config = resolveConfig({
        format: undefined,
      });

      expect(config.format).to.equal(DefaultConfig.format);
    });

    it('should return default when null', () => {
      const config = resolveConfig({
        format: null,
      });

      expect(config.format).to.equal(DefaultConfig.format);
    });
  });

  describe('FormatStamp Function', () => {
    it('should return default when undefined', () => {
      const config = resolveConfig({
        formatStamp: undefined,
      });

      expect(config.formatStamp).to.equal(DefaultConfig.formatStamp);
    });

    it('should return default when null', () => {
      const config = resolveConfig({
        formatStamp: null,
      });

      expect(config.formatStamp).to.equal(DefaultConfig.formatStamp);
    });
  });
});
