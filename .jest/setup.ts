window.HTMLElement.prototype.scrollIntoView = jest.fn()
global.requestAnimationFrame = ((_cb: FrameRequestCallback) => 0) as typeof requestAnimationFrame
global.cancelAnimationFrame = () => {}

global.ResizeObserver = class ResizeObserver {
  callback: ResizeObserverCallback
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}
