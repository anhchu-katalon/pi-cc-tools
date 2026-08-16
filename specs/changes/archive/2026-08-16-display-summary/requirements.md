# Requirements

## R1. Schema field

GIVEN an extension-owned or supported wrapped tool has an object parameter schema
WHEN the extension registers that tool
THEN its schema includes a string `displaySummary` field with concise user-facing intent guidance
AND the original schema object remains unchanged.

## R2. Summary preparation

GIVEN tool arguments contain a valid `displaySummary`
WHEN Pi prepares the call
THEN the extension preserves the normalized summary for rendering
AND removes the field before invoking the original argument preparation or executor.

## R3. Fallback

GIVEN tool arguments omit or provide an invalid `displaySummary`
WHEN Pi prepares the call
THEN the extension supplies a deterministic `Running <tool label>` fallback for rendering
AND the executor still receives no `displaySummary` field.

## R4. Sanitization

GIVEN a summary contains terminal control sequences, line breaks, or excess whitespace
WHEN the extension renders it
THEN control sequences are removed, whitespace is collapsed, and the result is length-limited.

## R5. Rendering

GIVEN a prepared tool call has a display summary
WHEN its call row renders
THEN the summary appears after the existing call description
AND existing status, grouping, and result rendering remain intact.

## R6. Compatibility

GIVEN a custom or wrapped tool already defines a `displaySummary` parameter
WHEN the extension encounters it
THEN the extension does not replace or alter that parameter's execution semantics.
