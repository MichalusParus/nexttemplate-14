window.HTMLElement.prototype.scrollIntoView = jest.fn()

window.matchMedia =
  window.matchMedia ||
  ((query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
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
