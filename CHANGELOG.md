# Changelog

## 0.2.0

- Add `formatBitrate(bitsPerSecond, options?)` for human-readable bandwidth display (`Kb/s`, `Mb/s`, `Gb/s`)
- Convert API section to standardized table format
- Remove trailing period from README one-liner to match the standard template

## 0.1.2

- Standardize README to 3-badge format with emoji Support section
- Update CI actions to v5 for Node.js 24 compatibility
- Add GitHub issue templates, dependabot config, and PR template

## 0.1.1

- Standardize README badges

## 0.1.0

- Initial release
- `formatBytes()` — convert bytes to human-readable string (KB, MB, GB, etc.)
- `parseBytes()` — parse human-readable string back to bytes
- `formatBits()` — format for network speeds (Kb, Mb, Gb)
- Binary mode (KiB, MiB, GiB) and decimal mode (KB, MB, GB)
- Configurable precision, locale, and spacing
