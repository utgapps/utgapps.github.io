# UTG Classroom architecture

The classroom is a browser-hosted application built for the existing `utgapps.github.io` static site. Its live address is `/classroom/`; source lives in `classroom-app/` and the production build is committed in `classroom/` for GitHub Pages.

## First delivery

- A permanent four-character, confusion-free class code is generated with `crypto.getRandomValues`.
- The deterministic PeerJS host address uses the locked `utg-academy-kitsilano-class-v1-<code>-host` prefix.
- The instructor browser hosts the room, approves first-time devices, and remembers approved device identifiers in the local class record.
- A student only receives the project the instructor assigns to that approved device.
- Class records, rosters, checkpoints, notes, and projects are stored in IndexedDB on the instructor browser. A student receives a project snapshot and can export a personal backup.
- `.classpack` is a portable JSON archive in this initial version. Import validates its schema before writing to local storage and never replaces the source archive.
- A PWA shell caches the classroom entry point for resilient reloads. It does not make new PeerJS joins work without internet signaling.

## Deliberate next implementation phases

The handoff PDF requires two deeper reliability layers that should be completed before broad classroom rollout: Yjs document-level differential synchronization (rather than whole-project snapshots) and Web Crypto keypair challenge-response approval (rather than the initial remembered device ID). The rest of the PDF's requirements - archive checksums/zip packaging, CodeMirror collaborative cursors, Sandpack runtime, device revocation, connection-chaos tests, and full error catalog - should be added in those subsequent phases.

This document records the gap explicitly so the current class workspace is never represented as having stronger cryptographic or offline guarantees than it actually has.
