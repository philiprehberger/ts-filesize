# @philiprehberger/filesize

[![CI](https://github.com/philiprehberger/ts-filesize/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-filesize/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/filesize)](https://www.npmjs.com/package/@philiprehberger/filesize)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Human-readable file size formatting and parsing — bytes to KB, MB, GB and back.

## Installation

```bash
npm install @philiprehberger/filesize
```

## Usage

### Format bytes

```ts
import { formatBytes } from '@philiprehberger/filesize';

formatBytes(0);             // "0 B"
formatBytes(1500);          // "1.5 KB"
formatBytes(1000000);       // "1 MB"
formatBytes(1000000000);    // "1 GB"
```

### Binary mode

```ts
import { formatBytes } from '@philiprehberger/filesize';

formatBytes(1024, { binary: true });    // "1 KiB"
formatBytes(1048576, { binary: true }); // "1 MiB"
```

### Parse file size strings

```ts
import { parseBytes } from '@philiprehberger/filesize';

parseBytes('1.5 MB');  // 1500000
parseBytes('1 GiB');   // 1073741824
parseBytes('500 B');   // 500
```

### Format bits

```ts
import { formatBits } from '@philiprehberger/filesize';

formatBits(1000);      // "1 Kb"
formatBits(1000000);   // "1 Mb"
```

## API

### `formatBytes(bytes: number, options?: FormatOptions): string`

Converts a byte count to a human-readable string using SI (decimal) or IEC (binary) units.

### `parseBytes(str: string): number`

Parses a human-readable file size string back to a byte count. Supports SI, IEC, and bit units. Case-insensitive.

### `formatBits(bits: number, options?: FormatOptions): string`

Converts a bit count to a human-readable string using SI bit units (Kb, Mb, Gb).

### `FormatOptions`

| Property    | Type      | Default | Description                              |
| ----------- | --------- | ------- | ---------------------------------------- |
| `binary`    | `boolean` | `false` | Use binary units (KiB, MiB) instead of SI (KB, MB) |
| `precision` | `number`  | `1`     | Number of decimal places                 |
| `locale`    | `string`  | —       | Locale for number formatting             |
| `space`     | `boolean` | `true`  | Include space between value and unit     |

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
