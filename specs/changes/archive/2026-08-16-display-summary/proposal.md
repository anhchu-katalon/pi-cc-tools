# Display summaries for tool calls

## Problem

Grouped tool rows show raw paths, commands, and patterns, but not the model's short explanation of why each call is being made.

## Desired outcome

Add an optional `displaySummary` field to tool-call schemas. The model can provide a short user-facing intent phrase, which the extension renders beside the existing tool summary without sending that field to tool executors.

## Scope

- Add `displaySummary` to schemas owned or wrapped by this extension.
- Normalize and sanitize the field before rendering.
- Preserve it through argument preparation and remove it before execution.
- Show it in built-in, OpenAI-style, and MCP-style tool call rows.
- Provide deterministic fallback text when a call omits it.

## Non-goals

- No extra model request.
- No new API key or provider integration.
- No changes to tool result bodies or execution semantics.
- No aggregate-layout redesign.

## Risks

Adding a required schema field increases tool-call prompt and argument size. Invalid or missing values must remain safe and must not reach executors.

## Acceptance criteria

- Tool schemas expose a string `displaySummary` field with concise intent guidance.
- Rendered calls show the sanitized summary when supplied.
- Executors receive arguments without `displaySummary`.
- Missing summaries render deterministic fallback text.
- Existing tool arguments and renderers continue working.
