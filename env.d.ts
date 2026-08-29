/// <reference types="vite/client" />

declare module 'bootstrap' {
  export class Tooltip {
    constructor(element: Element, options?: Record<string, unknown>)
    show(): void
    hide(): void
    dispose(): void
  }

  export class Dropdown {
    constructor(element: Element, options?: { autoClose?: boolean | 'inside' | 'outside' })
    show(): void
    hide(): void
    toggle(): void
    dispose(): void
    static getOrCreateInstance(
      element: Element,
      options?: { autoClose?: boolean | 'inside' | 'outside' },
    ): Dropdown
  }
}
