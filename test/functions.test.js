import { test, expect } from 'vitest';
import '../src/functions';

test('functionComplement', () => {
    expect(functionComplement([
        {'Integer': 0xFF0804}
    ])).toStrictEqual({'Integer': 0x00F7FB})
});

test('functionColour', () => {
    expect(functionColour([
        {'String': 'daffodil'}
    ])).toStrictEqual({'Integer': 0xffff31})
    expect(() => expect(functionColour([
        {'String': 'foobar'}
    ]))).toThrow();
});

test('functionIntToRGB', () => {
    expect(functionIntToRGB([
        {'Integer': 0xFF0804}
    ])).toEqual({'Array': [
        {'Integer': 255},
        {'Integer': 8},
        {'Integer': 4},
    ]})
});

test('functionRGBToInt', () => {
    expect(functionRGBToInt([{'Array': [
        {'Integer': 255},
        {'Integer': 8},
        {'Integer': 4},
    ]}
    ])).toEqual({'Integer': 0xFF0804})
    expect(functionRGBToInt([
        {'Integer': 255},
        {'Integer': 8},
        {'Integer': 4},
    ])).toEqual({'Integer': 0xFF0804})

    expect(functionRGBToInt([
        {'Integer': 255},
        {'Integer': 8},
        {'Integer': 4},
    ])).toEqual({'Integer': 0xFF0804})
    expect(functionRGBToInt([
        {'Integer': 255},
        {'Integer': 8},
        {'Integer': 4},
    ])).toEqual({'Integer': 0xFF0804})
});

test('functionRGBToHSL', () => {
    expect(functionRGBToHSL([{'Array': [
        {'Integer': 128},
        {'Integer': 128},
        {'Integer': 128},
    ]}
    ])).toEqual({'Array': [
        {'Float': 0},
        {'Float': 0},
        {'Float': 0.5},
    ]})

    expect(functionRGBToHSL([
        {'Integer': 128},
        {'Integer': 128},
        {'Integer': 128},
    ])).toEqual({'Array': [
        {'Float': 0},
        {'Float': 0},
        {'Float': 0.5},
    ]})
});

test('functionHSLToRGB', () => {
    expect(functionHSLToRGB([{'Array': [
        {'Float': 0},
        {'Float': 0},
        {'Float': 0.5},
    ]}
    ])).toEqual({'Array': [
        {'Integer': 128},
        {'Integer': 128},
        {'Integer': 128},
    ]})

    expect(functionHSLToRGB([
        {'Float': 0},
        {'Float': 0},
        {'Float': 0.5},
    ])).toEqual({'Array': [
        {'Integer': 128},
        {'Integer': 128},
        {'Integer': 128},
    ]})
});

test('functionHSLToInt', () => {
    expect(functionHSLToInt([{'Array': [
        {'Integer': 0},
        {'Integer': 0},
        {'Float': 0.5},
    ]}
    ])).toEqual({'Integer': 0x808080})
    
    expect(functionHSLToInt([
        {'Integer': 0},
        {'Integer': 0},
        {'Float': 0.5},
    ])).toEqual({'Integer': 0x808080})
});