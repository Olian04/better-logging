//@ts-check
const { expect } = require('chai');
const { Config, DefaultConfig } = require('../../dist/lib/config');
const { MessageConstructionStrategy } = require('../../dist/lib/enums/messageConstructionStrategy');
const { formatMessage } = require('../../dist/lib/formatMessage');
const { removeColors } = require('../../dist/lib/util/removeColor');

describe('Format-Message', () => {
  it('MessageConstructionStrategy.FIRST', () => {
    const config = new Config({
      ...DefaultConfig,
      format: ctx => ctx.msg,
      messageConstructionStrategy: MessageConstructionStrategy.FIRST,
    });

    const input = [1, 2, 3];
    const [message, rest] = formatMessage('log', config, input);

    expect(removeColors(message)).to.equal('1');
    expect(rest).to.deep.equal([2, 3]);
  });

  it('MessageConstructionStrategy.ALL', () => {
    const config = new Config({
      ...DefaultConfig,
      format: ctx => ctx.msg,
      messageConstructionStrategy: MessageConstructionStrategy.ALL,
    });

    const input = [1, 2, 3];
    const [message, rest] = formatMessage('log', config, input);

    expect(removeColors(message)).to.equal('1 2 3');
    expect(rest).to.deep.equal([]);
  });

  it('MessageConstructionStrategy.NONE', () => {
    const config = new Config({
      ...DefaultConfig,
      format: ctx => ctx.msg,
      messageConstructionStrategy: MessageConstructionStrategy.NONE,
    });

    const input = [1, 2, 3];
    const [message, rest] = formatMessage('log', config, input);

    expect(removeColors(message)).to.equal('');
    expect(rest).to.deep.equal([1, 2, 3]);
  });

  describe('Custom FormatStamp Function', () => {
    it('should return content with a custom stamp', ()=> {
      const config = new Config({
        ...DefaultConfig,
        format: ctx => ctx.type,
        formatStamp: content => `START-${content}-END`,
      });

      const input = [1, 2, 3];
      const [message, rest] = formatMessage('log', config, input);

      expect(removeColors(message)).to.equal('START-log-END');
      expect(rest).to.deep.equal([]);
    })
  })
});
