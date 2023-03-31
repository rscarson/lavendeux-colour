import { test, expect, describe } from 'vitest';
import {RGBColour, HSLColour, Colour} from '../src/rgb_utils';

describe('Colour', () => {
    test('toInt', () => {
        let colour = new Colour([0xFF, 0xA, 0xB]);
        expect(colour.toInt()).toBe(0xFF0A0B);
    })
    
    test('fromInt', () => {
        let colour = Colour.fromInt(0xFF0A0B, 3);
        expect(colour.toArray()).toStrictEqual([0xFF, 0xA, 0xB]);
    })
});

describe('RGBColour', () => {
    test('fromHSL', () => {
        expect(RGBColour.fromHSL(new HSLColour(0, 0, 0.5)).toArray()).toStrictEqual([128, 128, 128]);
        expect(RGBColour.fromHSL(new HSLColour(193, 0.672, 0.275)).toArray()).toStrictEqual([23, 96, 117]);
    })
});

describe('HSLColour', () => {
    test('fromRGB', () => {
        expect(HSLColour.fromRGB(new RGBColour(128, 128, 128)).toArray()).toStrictEqual([0, 0, 0.5]);
        expect(HSLColour.fromRGB(new RGBColour(23, 96, 117)).toArray()).toStrictEqual([193, 0.67, 0.27]);
    })
});