export class StringBuilder {

    private readonly stringArray: string[] = [];

    public append(string: string): void {
        this.stringArray.push(string);
    }

    public appendLine(string: string): void {
        this.stringArray.push(`${string}\n`);
    }

    public toString(): string {
        return this.stringArray.join('');
    }
}
