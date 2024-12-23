# TypeScript Common Functionality

This repository contains common Typescript functionality that I use regularly. It includes various utilities, types, and classes to facilitate development in Typescript.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [Continuous Integration](#continuous-integration)
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

## Continuous Integration
### Build, Test and Lint
[![Build, test and lint Node.js Package](https://github.com/stevenkellner/typescript-common-functionality/actions/workflows/build-test-lint.yml/badge.svg)](https://github.com/stevenkellner/typescript-common-functionality/actions/workflows/build-test-lint.yml)

On each push and pull request, the CI runs the build, test and lint script to verify the package.

### Coverage Report
[![Run Test with Coverage Report and upload it to Github Pages](https://github.com/stevenkellner/typescript-common-functionality/actions/workflows/coverage-report.yml/badge.svg)](https://github.com/stevenkellner/typescript-common-functionality/actions/workflows/coverage-report.yml)

The coverage report is generated automatically by the CI on each push and pull request. You can view the latest coverage report [here](https://stevenkellner.github.io/typescript-common-functionality/).

### Publish to npm
[![Publish Node.js Package](https://github.com/stevenkellner/typescript-common-functionality/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/stevenkellner/typescript-common-functionality/actions/workflows/npm-publish.yml) 

The library is published automatically as a npm package and a github release is created by the CI on each new release tag. The npm package can be found [here](https://www.npmjs.com/package/@stevenkellner/typescript-common-functionality), you can install it with `npm install @stevenkellner/typescript-common-functionality`.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
