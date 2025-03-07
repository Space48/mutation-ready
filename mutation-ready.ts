declare global {
  interface Window {
    WebKitMutationObserver: MutationObserver;
  }
}

type MutationElementReady = Element & {
  ready: boolean;
};

interface Listener {
  selector: string;
  callback: (element: Element) => void;
}

const listeners: Listener[] = [];
const document: Document = window.document;
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
let observer: MutationObserver | null;

function check(): void {
  // Check the DOM for elements matching a stored selector
  for (let count = 0, length = listeners.length; count < length; count++) {
    const listener = listeners[count];
    // Query for elements matching the specified selector
    const elements = document.querySelectorAll(listener.selector);
    for (let elementCount = 0, elementsLength = elements.length; elementCount < elementsLength; elementCount++) {
      const element = elements[elementCount] as MutationElementReady;
      // Make sure the callback isn't invoked with the
      // same element more than once
      if (!element.ready) {
        element.ready = true;
        // Invoke the callback with the element
        listener.callback.call(element, element);
      }
    }
  }
}

function ready(selector: string, callback: (element: Element) => void): void {
  listeners.push({
    selector,
    callback,
  });

  if (!observer) {
    // Watch for changes in the document
    observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  // Check if the element is currently in the DOM
  check();
}

/**
 * @param {string} selector - CSS selector
 * @param {function} fn - Callback function
 * @returns {void}
 * @example
 * mutationReady('.my-element', (element) => {
 *  // Do something with `element`
 * });
 */
export const mutationReady = ready;