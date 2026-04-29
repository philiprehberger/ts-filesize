import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatBytes, parseBytes, formatBits, formatBitrate } from '../../dist/index.js';

describe('formatBytes', () => {
  it('should format 0 bytes', () => {
    assert.equal(formatBytes(0), '0 B');
  });

  it('should format bytes below 1 KB', () => {
    assert.equal(formatBytes(500), '500 B');
  });

  it('should format 1 KB', () => {
    assert.equal(formatBytes(1000), '1 KB');
  });

  it('should format 1.5 KB', () => {
    assert.equal(formatBytes(1500), '1.5 KB');
  });

  it('should format 1 MB', () => {
    assert.equal(formatBytes(1000000), '1 MB');
  });

  it('should format 1 GB', () => {
    assert.equal(formatBytes(1000000000), '1 GB');
  });

  it('should format 1 TB', () => {
    assert.equal(formatBytes(1000000000000), '1 TB');
  });

  it('should format binary KiB', () => {
    assert.equal(formatBytes(1024, { binary: true }), '1 KiB');
  });

  it('should format binary MiB', () => {
    assert.equal(formatBytes(1048576, { binary: true }), '1 MiB');
  });

  it('should respect precision option', () => {
    assert.equal(formatBytes(1536, { precision: 2 }), '1.54 KB');
  });

  it('should format without space when space is false', () => {
    assert.equal(formatBytes(1000, { space: false }), '1KB');
  });

  it('should format negative values', () => {
    assert.equal(formatBytes(-1500), '-1.5 KB');
  });

  it('should return string representation for Infinity', () => {
    assert.equal(formatBytes(Infinity), 'Infinity');
  });

  it('should return string representation for NaN', () => {
    assert.equal(formatBytes(NaN), 'NaN');
  });
});

describe('parseBytes', () => {
  it('should parse MB', () => {
    assert.equal(parseBytes('1.5 MB'), 1500000);
  });

  it('should parse GiB', () => {
    assert.equal(parseBytes('1 GiB'), 1073741824);
  });

  it('should parse plain bytes', () => {
    assert.equal(parseBytes('500 B'), 500);
  });

  it('should parse zero bytes', () => {
    assert.equal(parseBytes('0 B'), 0);
  });

  it('should be case-insensitive', () => {
    assert.equal(parseBytes('1 kb'), 1000);
  });

  it('should throw on invalid input', () => {
    assert.throws(() => parseBytes('not a size'), /Invalid file size string/);
  });

  it('should throw on unknown unit', () => {
    assert.throws(() => parseBytes('5 XB'), /Unknown unit/);
  });
});

describe('formatBits', () => {
  it('should format 0 bits', () => {
    assert.equal(formatBits(0), '0 b');
  });

  it('should format 1 Kb', () => {
    assert.equal(formatBits(1000), '1 Kb');
  });

  it('should format 1 Mb', () => {
    assert.equal(formatBits(1000000), '1 Mb');
  });
});

describe('formatBitrate', () => {
  it('appends /s to formatBits output', () => {
    assert.equal(formatBitrate(1000), '1 Kb/s');
    assert.equal(formatBitrate(1_000_000), '1 Mb/s');
  });

  it('respects formatting options', () => {
    assert.equal(formatBitrate(1500, { precision: 2 }), '1.5 Kb/s');
    assert.equal(formatBitrate(1000, { space: false }), '1Kb/s');
  });

  it('handles zero', () => {
    assert.equal(formatBitrate(0), '0 b/s');
  });
});
