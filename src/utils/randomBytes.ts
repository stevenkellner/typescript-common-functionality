export const randomBytes: (n: number) => Uint8Array = (typeof self !== 'undefined' && 'crypto' in self)
    ? (n: number): Uint8Array => {
            const { crypto } = self;
            const QUOTA = 65536;
            const a = new Uint8Array(n);
            for (let i = 0; i < n; i += QUOTA)
                crypto.getRandomValues(a.subarray(i, i + Math.min(n - i, QUOTA)));
            return a;
        }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    : require('crypto').randomBytes;
