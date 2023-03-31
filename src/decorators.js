import { LavendeuxValue } from './lavendeux';

/**
 * Decorator that expresses an integer value into as HTML color code
 *  Usage: <int> @color
 * Can be called from the lavendeux parser
 * It takes in a value object, which will have one of the following properties:
 *  Integer, Float, String
 * 
 * It then returns a string
 * @param {Value} args 
 * @returns {String} result
 */
globalThis.decoratorColour = (value) => {
    let input = LavendeuxValue.asInteger(value);
    return `#${input.toString(16).padEnd(6, '0')}`;
}