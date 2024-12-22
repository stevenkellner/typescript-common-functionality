# TypeScript Common Functionality

This repository contains common Typescript functionality that I use regularly. It includes various utilities, types, and classes to facilitate development in Typescript.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Coverage Report](#coverage-report)
- [License](#license)

## Installation

To install the package, use npm:

```bash
npm install @stevenkellner/typescript-common-functionality
```

## Usage

Import the necessary modules and use them in your TypeScript project:

```ts
import { UtcDate, Result, Logger } from '@stevenkellner/typescript-common-functionality';

// Example usage
const date = UtcDate.now;
const result = Result.success('Operation successful');
const logger = new Logger();
logger.info('ExampleFunction', 'This is an info message');
```

## Features

- **Utilities**: Various utility functions for common tasks.
- **Types**: Commonly used TypeScript types and interfaces.
- **Logger**: A simple logger for logging messages with different levels.
- **Crypter**: Encryption and decryption utilities.
- **Padding**: Padding utilities for cryptographic operations.
- **Hasher**: Hashing utilities.
- **Message Authenticator**: HMAC and other message authentication utilities.
- **Bytes Coder**: Encoding and decoding utilities for bytes.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## Coverage Report
The coverage report is generated automatically by the CI on each push and pull request. You can view the latest coverage report [here](https://stevenkellner.github.io/typescript-common-functionality/).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
