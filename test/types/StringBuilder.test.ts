import { expect } from '@assertive-ts/core';
import { StringBuilder } from '../../src/types/StringBuilder';

describe('StringBuilder', () => {

    let stringBuilder: StringBuilder;

    beforeEach(() => {
        stringBuilder = new StringBuilder();
    });

    it('should append a string', () => {
        stringBuilder.append('Hello');
        expect(stringBuilder.toString()).toBeEqual('Hello');
    });

    it('should append multiple strings', () => {
        stringBuilder.append('Hello');
        stringBuilder.append(' ');
        stringBuilder.append('World');
        expect(stringBuilder.toString()).toBeEqual('Hello World');
    });

    it('should append a string with a newline', () => {
        stringBuilder.appendLine('Hello');
        expect(stringBuilder.toString()).toBeEqual('Hello\n');
    });

    it('should append multiple strings with newlines', () => {
        stringBuilder.appendLine('Hello');
        stringBuilder.appendLine('World');
        expect(stringBuilder.toString()).toBeEqual('Hello\nWorld\n');
    });

    it('should handle a mix of append and appendLine', () => {
        stringBuilder.append('Hello');
        stringBuilder.appendLine(' World');
        stringBuilder.append('!');
        expect(stringBuilder.toString()).toBeEqual('Hello World\n!');
    });

    it('should return an empty string when no strings are appended', () => {
        expect(stringBuilder.toString()).toBeEqual('');
    });
});
