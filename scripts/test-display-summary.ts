import assert from "node:assert/strict";
import {
	addDisplaySummaryParameter,
	getDisplaySummary,
	normalizeDisplaySummary,
	prepareDisplaySummary,
	stripDisplaySummary,
} from "../extensions/index.ts";

const original = {
	type: "object",
	properties: { path: { type: "string" } },
	required: ["path"],
};
const next = addDisplaySummaryParameter(original, "read");
assert.notEqual(next, original);
assert.equal(next.properties.displaySummary.type, "string");
assert.deepEqual(next.required, ["path", "displaySummary"]);
assert.equal(original.properties.displaySummary, undefined);

const raw = {
	path: "README.md",
	displaySummary: "  Inspecting\x1b[31m the README\n now  ",
};
assert.equal(normalizeDisplaySummary(raw.displaySummary), "Inspecting the README now");
assert.equal(getDisplaySummary(raw), "Inspecting the README now");
assert.deepEqual(stripDisplaySummary(raw), { path: "README.md" });
assert.deepEqual(prepareDisplaySummary(raw, "Read"), {
	path: "README.md",
	displaySummary: "Inspecting the README now",
});
assert.deepEqual(prepareDisplaySummary({ path: "README.md" }, "Read"), {
	path: "README.md",
	displaySummary: "Running Read",
});

console.log("displaySummary checks passed");
