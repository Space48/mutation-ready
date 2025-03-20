# mutation-ready

A lightweight utility for detecting and handling DOM mutations using MutationObserver.

This utility was inspired by the MutationObserver implementation from [BigCommerce's Guide to Checkout Customisation](https://medium.com/bigcommerce-developer-blog/the-complete-guide-to-checkout-customisation-on-bigcommerce-6b566bc36fa9#f957).

## Installation

```bash
npm install @space48/mutation-ready
```

## Usage

```typescript
import { mutationReady } from "@space48/mutation-ready";

// Wait for an element to appear in the DOM
mutationReady(".my-element", (element) => {
  // Do something with the element
  console.log("Element is ready:", element);
});
```

## Features

- Lightweight and dependency-free
- TypeScript support
- Uses MutationObserver for efficient DOM monitoring
- Handles dynamic content loading
- WebKit compatibility

## API

### mutationReady(selector: string, callback: (element: Element) => void): void

- `selector`: CSS selector string to match elements
- `callback`: Function to be called when matching elements are found
- Each element will only trigger the callback once

## Licence

MIT
