# Changelog

## [1.0.3] - 2026-04-24

### Fixed

- Guarded observer setup when `MutationObserver` is unavailable, while still running an immediate DOM check.
- Excluded `*.test.ts` from TypeScript build output to stop emitting test artifacts into `dist`.
- Fixed package metadata and publish list (`license` key and `LICENSE` filename).
- Restricted published `dist` artifacts to runtime and declaration entrypoints only.

## [1.0.2] - 2026-04-24

### Fixed

- Replaced per-element `ready` boolean property (stamped directly onto DOM nodes) with a `WeakSet<Element>` stored per listener. This prevents stale deduplication when the same element node is reused across re-renders, and avoids polluting DOM elements with custom properties.

## [1.0.1] - Initial release
