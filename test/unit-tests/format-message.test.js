//@ts-check
const { expect } = require('chai');
const { Theme } = require('../../dist/api');
const { Config, DefaultConfig } = require('../../dist/lib/config');
const { MessageConstructionStrategy } = require('../../dist/lib/enums/messageConstructionStrategy');
const { formatMessage } = require('../../dist/lib/formatMessage');

describe('Format-Message', () => {
  it('MessageConstructionStrategy.FIRST', () => {
    const config = new Config({
      ...DefaultConfig,
      format: ctx => ctx.msg,
      messageConstructionStrategy: MessageConstructionStrategy.FIRST,
      color: Theme.noColor,
    });

    const input = [1, 2, 3];
    const [message, rest] = formatMessage('log', config, input);

    expect(message).to.equal('1');
    expect(rest).to.deep.equal([2, 3]);
  });

  it('MessageConstructionStrategy.ALL', () => {
    const config = new Config({
      ...DefaultConfig,
      format: ctx => ctx.msg,
      messageConstructionStrategy: MessageConstructionStrategy.ALL,
      color: Theme.noColor,
    });

    const input = [1, 2, 3];
    const [message, rest] = formatMessage('log', config, input);

    expect(message).to.equal('1 2 3');
    expect(rest).to.deep.equal([]);
  });

  it('MessageConstructionStrategy.NONE', () => {
    const config = new Config({
      ...DefaultConfig,
      format: ctx => ctx.msg,
      messageConstructionStrategy: MessageConstructionStrategy.NONE,
      color: Theme.noColor,
    });

    const input = [1, 2, 3];
    const [message, rest] = formatMessage('log', config, input);

    expect(message).to.equal('');
    expect(rest).to.deep.equal([1, 2, 3]);
  });

  describe('Custom FormatStamp Function', () => {
    it('should return content with a custom stamp', ()=> {
      const config = new Config({
        ...DefaultConfig,
        format: ctx => ctx.type,
        formatStamp: content => `START-${content}-END`,
        color: Theme.noColor,
      });

      const input = [1, 2, 3];
      const [message, rest] = formatMessage('log', config, input);

      expect(message).to.equal('START-log-END');
      expect(rest).to.deep.equal([]);
    })
  })
});
