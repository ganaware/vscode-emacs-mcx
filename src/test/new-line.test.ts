import * as assert from "assert";
import * as vscode from "vscode";
import {Position, Selection} from "vscode";
import { EmacsEmulator } from "../emulator";
import { assertTextEqual, cleanUpWorkspace, setupWorkspace} from "./utils";

suite("Emulator.newLine", () => {
    let activeTextEditor: vscode.TextEditor;
    let emulator: EmacsEmulator;

    suite("with non-empty text", () => {
        setup(async () => {
            const initialText = `0123456789
abcdefghij
ABCDEFGHIJ`;
            activeTextEditor = await setupWorkspace(initialText);
            emulator = new EmacsEmulator(activeTextEditor);
        });

        teardown(cleanUpWorkspace);

        suite("single cursor in the middle line of the document", () => {
            const cursorLineNum = 1;

            test(`it works with single cursor at the beginning of the line`, async () => {
                activeTextEditor.selections = [
                    new Selection(
                        new Position(cursorLineNum, 0),
                        new Position(cursorLineNum, 0),
                    ),
                ];

                await emulator.newLine();

                assertTextEqual(activeTextEditor, `0123456789

abcdefghij
ABCDEFGHIJ`);
            });

            test(`it works with single cursor at the middle of the line`, async () => {
                activeTextEditor.selections = [
                    new Selection(
                        new Position(cursorLineNum, 5),
                        new Position(cursorLineNum, 5),
                    ),
                ];

                await emulator.newLine();

                assertTextEqual(activeTextEditor, `0123456789
abcde
fghij
ABCDEFGHIJ`);
            });

            test(`it works with single cursor at the end of the line`, async () => {
                activeTextEditor.selections = [
                    new Selection(
                        new Position(cursorLineNum, 10),
                        new Position(cursorLineNum, 10),
                    ),
                ];

                await emulator.newLine();

                assertTextEqual(activeTextEditor, `0123456789
abcdefghij

ABCDEFGHIJ`);
            });
        });

        suite("single cursor in the last line of the document", () => {
            const cursorLineNum = 2;

            test(`it works with single cursor at the beginning of the line`, async () => {
                activeTextEditor.selections = [
                    new Selection(
                        new Position(cursorLineNum, 0),
                        new Position(cursorLineNum, 0),
                    ),
                ];

                await emulator.newLine();

                assertTextEqual(activeTextEditor, `0123456789
abcdefghij

ABCDEFGHIJ`);
            });

            test(`it works with single cursor at the middle of the line`, async () => {
                activeTextEditor.selections = [
                    new Selection(
                        new Position(cursorLineNum, 5),
                        new Position(cursorLineNum, 5),
                    ),
                ];

                await emulator.newLine();

                assertTextEqual(activeTextEditor, `0123456789
abcdefghij
ABCDE
FGHIJ`);
            });

            test(`it works with single cursor at the end of the line`, async () => {
                activeTextEditor.selections = [
                    new Selection(
                        new Position(cursorLineNum, 10),
                        new Position(cursorLineNum, 10),
                    ),
                ];

                await emulator.newLine();

                assertTextEqual(activeTextEditor, `0123456789
abcdefghij
ABCDEFGHIJ
`);
            });
        });

        suite("in mark-mode", () => {
            test("it cancels mark-mode and does NOT remove the selected text", async () => {
                // Set up mark-mode
                activeTextEditor.selections = [
                    new Selection(new Position(0, 0), new Position(0, 0)),
                ];
                emulator.setMarkCommand();
                await emulator.runCommand("forwardChar");
                assert.ok(activeTextEditor.selections.every((selection) => !selection.isEmpty));

                // Test newLine
                await emulator.newLine();

                assertTextEqual(activeTextEditor, `0
123456789
abcdefghij
ABCDEFGHIJ`);

                assert.ok(
                    activeTextEditor.selections.every((selection) => selection.isEmpty),
                );

                // Then, next mark-mode works
                activeTextEditor.selections = [
                    new Selection(new Position(0, 0), new Position(0, 0)),
                ];
                emulator.setMarkCommand();
                await emulator.runCommand("forwardChar");
                assert.ok(activeTextEditor.selections.every((selection) => !selection.isEmpty));
            });
        });
    });

    suite("with auto-indentation", () => {
        setup(async () => {
            const initialText = "()";
            activeTextEditor = await setupWorkspace(initialText);
            emulator = new EmacsEmulator(activeTextEditor);
        });

        teardown(cleanUpWorkspace);

        test("newLine preserves the indent", async () => {
            activeTextEditor.selections = [
                new Selection(
                    new Position(0, 1),
                    new Position(0, 1),
                ),
            ];

            await emulator.newLine();

            assertTextEqual(activeTextEditor, "(\n    \n)");
            assert.equal(activeTextEditor.selection.active.line, 1);
            assert.equal(activeTextEditor.selection.active.character, 4);
        });
    });

    suite("without auto-indentation", () => {
        setup(async () => {
            const initialText = "(a)";
            activeTextEditor = await setupWorkspace(initialText);
            emulator = new EmacsEmulator(activeTextEditor);
        });

        teardown(cleanUpWorkspace);

        test("newLine preserves the indent", async () => {
            activeTextEditor.selections = [
                new Selection(
                    new Position(0, 2),
                    new Position(0, 2),
                ),
            ];

            await emulator.newLine();

            assertTextEqual(activeTextEditor, "(a\n)");
            assert.equal(activeTextEditor.selection.active.line, 1);
            assert.equal(activeTextEditor.selection.active.character, 0);
        });
    });
});
