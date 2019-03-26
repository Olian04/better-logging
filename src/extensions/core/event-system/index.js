//@ts-check
module.exports = () => ({
  name: 'core-event-system',
  dependencies: [],
  events: {},
  nextEventID: 0,
  userListeners: [],
  create(config) {
    this.userListeners = config.on || {};
  },
  install(app, hostObject) {
    app.on = (event, handler) => {
      const newEvent = { handler, id: this.nextEventID };
      this.nextEventID += 1;
      this.events[event] = this.events[event]
        ? [...this.events[event], newEvent]
        : [newEvent];
      return newEvent.id;
    };
    app.off = (event, ID) => {
      if (this.events[event] === undefined || this.events[event].length === 0) {
        throw new Error(`Failed to "off" event "${event}" with ID "${ID}"`);
      }
      this.events[event] = this.events[event].filter(ev => ev.id !== ID);
    };
    app.emit = (event, payload) => {
      if (this.events[event] === undefined) return; // theres no listeners for this event
      this.events[event].forEach(ev => ev.handler(payload));
    };
  },
  finalize(app, hostObject) {
    Object.keys(this.userListeners).forEach(event =>
      app.on(event, this.userListeners[event])
    );
  }
});
