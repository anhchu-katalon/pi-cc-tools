# Design

## Chosen approach

Implement small local helpers in `extensions/index.ts` based on the upstream `displaySummary` mechanism:

- Clone object schemas and add a required string field without mutating source schemas.
- Normalize summaries by removing OSC, CSI, ESC, and control sequences, collapsing whitespace, and clamping length.
- Prepare arguments by stripping the presentation field before calling original preparation or execution, then preserve the normalized value for renderers.
- Add the intent phrase to existing tool-row summaries.
- Apply the same wrapper behavior to extension-owned built-ins and the existing OpenAI-style and MCP override registrations.

The field is model-written in the normal tool call. No second inference request is made.

## Alternatives rejected

- Reading intent from tool results: unavailable until after execution and too late for call-row display.
- A second model request: adds latency, cost, and failure modes.
- Mutating original tool schemas: risks changing other extensions and violates registration ownership.

## Trade-offs

A required field gives consistent model output but adds prompt and argument tokens. Fallbacks keep rendering useful when providers omit the field.
