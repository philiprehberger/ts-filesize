import type { FormatOptions } from './types';

const SI_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
const IEC_UNITS = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB'];
const BIT_UNITS = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb'];

export function formatBytes(bytes: number, options: FormatOptions = {}): string {
  const { binary = false, precision = 1, space = true } = options;

  if (!Number.isFinite(bytes)) return String(bytes);
  if (bytes === 0) return `0${space ? ' ' : ''}B`;

  const negative = bytes < 0;
  const absBytes = Math.abs(bytes);
  const base = binary ? 1024 : 1000;
  const units = binary ? IEC_UNITS : SI_UNITS;

  let unitIndex = 0;
  let value = absBytes;

  while (value >= base && unitIndex < units.length - 1) {
    value /= base;
    unitIndex++;
  }

  const formatted = unitIndex === 0
    ? String(value)
    : value.toFixed(precision).replace(/\.?0+$/, '');

  const separator = space ? ' ' : '';
  return `${negative ? '-' : ''}${formatted}${separator}${units[unitIndex]}`;
}

export function parseBytes(str: string): number {
  const match = str.trim().match(/^(-?\d+(?:\.\d+)?)\s*([\w]+)$/i);
  if (!match) throw new Error(`Invalid file size string: "${str}"`);

  const value = parseFloat(match[1]);
  const unit = match[2];

  // Try exact match first (case-sensitive), then case-insensitive for SI/IEC
  const unitMap: Record<string, { multiplier: number; bits: boolean }> = {};

  // Bit units (case-sensitive: lowercase 'b')
  for (let i = 0; i < BIT_UNITS.length; i++) {
    unitMap[BIT_UNITS[i]] = { multiplier: Math.pow(1000, i), bits: true };
  }

  // Byte units (case-sensitive first)
  for (let i = 0; i < SI_UNITS.length; i++) {
    unitMap[SI_UNITS[i]] = { multiplier: Math.pow(1000, i), bits: false };
  }
  for (let i = 0; i < IEC_UNITS.length; i++) {
    unitMap[IEC_UNITS[i]] = { multiplier: Math.pow(1024, i), bits: false };
  }

  // Try exact match
  let entry = unitMap[unit];

  // Fall back to case-insensitive match (but skip bit units to avoid b/B confusion)
  if (!entry) {
    const key = Object.keys(unitMap).find(
      (k) => k.toLowerCase() === unit.toLowerCase() && !unitMap[k].bits,
    );
    if (key) entry = unitMap[key];
  }

  if (!entry) throw new Error(`Unknown unit: "${unit}"`);

  return entry.bits ? (value * entry.multiplier) / 8 : value * entry.multiplier;
}

export function formatBits(bits: number, options: FormatOptions = {}): string {
  const { precision = 1, space = true } = options;

  if (!Number.isFinite(bits)) return String(bits);
  if (bits === 0) return `0${space ? ' ' : ''}b`;

  const negative = bits < 0;
  const absBits = Math.abs(bits);
  const base = 1000;

  let unitIndex = 0;
  let value = absBits;

  while (value >= base && unitIndex < BIT_UNITS.length - 1) {
    value /= base;
    unitIndex++;
  }

  const formatted = unitIndex === 0
    ? String(value)
    : value.toFixed(precision).replace(/\.?0+$/, '');

  const separator = space ? ' ' : '';
  return `${negative ? '-' : ''}${formatted}${separator}${BIT_UNITS[unitIndex]}`;
}

export function formatBitrate(bitsPerSecond: number, options: FormatOptions = {}): string {
  if (!Number.isFinite(bitsPerSecond)) return String(bitsPerSecond);
  return `${formatBits(bitsPerSecond, options)}/s`;
}
