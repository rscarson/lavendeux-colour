import { RGBColour, HSLColour } from './rgb_utils';
import { LavendeuxValue, LavendeuxInteger, LavendeuxFloat } from './lavendeux';
import color_map from '../data/colour_names';

/**
 * Function that converts an integer value into an array of [r,g,b]
 *  Usage: int_to_rgb(<int>)
 * Can be called from the lavendeux parser
 * It takes in an array of value objects, which will have one of the following properties:
 *  Integer, Float, String
 * 
 * It then returns a value object
 * @param {Value} args 
 * @returns {Value} result
 */
globalThis.functionIntToRGB = (args) => {
    if (args.length != 1) {
        throw new Error("int_to_rgb(n): expected 1 argument");
    }

    let inputValue = LavendeuxValue.asInteger(args[0]);

    let rgb = RGBColour.fromInt(inputValue);
    return LavendeuxValue.returnArray(
        rgb.toArray().map(e => new LavendeuxInteger(e))
    );
}

/**
 * Function that converts an array of [r,g,b] into an integer value
 *  Usage: rgb_to_int([r,g,b])
 * Can be called from the lavendeux parser
 * It takes in an array of value objects, which will have one of the following properties:
 *  Integer, Float, String
 * 
 * It then returns a value object
 * @param {Value} args 
 * @returns {Value} result
 */
globalThis.functionRGBToInt = (args) => {
    if (args.length != 1 && args.length != 3) {
        throw new Error("rgb_to_int([r,g,b])|rgb_to_int(r,g,b): expected 1 or 3 arguments");
    }

    let values = (args.length == 1) 
        ? LavendeuxValue.asArray(args[0])
        : args.map(e => LavendeuxValue.asInteger(e));

    if (values.length != 3)
        throw new Error("rgb_to_int([r,g,b]): expected 3 elements");

    return LavendeuxValue.returnInteger(new RGBColour(...values).toInt());
}

/**
 * Function that converts an array of [r,g,b] into an array of [h,s,l]
 *  Usage: rgb_to_hsl([r,g,b])
 * Can be called from the lavendeux parser
 * It takes in an array of value objects, which will have one of the following properties:
 *  Integer, Float, String
 * 
 * It then returns a value object
 * @param {Value} args 
 * @returns {Value} result
 */
globalThis.functionRGBToHSL = (args) => {
    if (args.length != 1 && args.length != 3) {
        throw new Error("rgb_to_hsl([r,g,b])|rgb_to_hsl(r,g,b): expected 1 or 3 arguments");
    }

    let values = (args.length == 1) 
        ? LavendeuxValue.asArray(args[0])
        : args.map(e => LavendeuxValue.asInteger(e));

    if (values.length != 3)
        throw new Error("rgb_to_hsl([r,g,b]): expected 3 elements");

    let rgb = new RGBColour(...values);
    let hsl = HSLColour.fromRGB(rgb);
    return LavendeuxValue.returnArray(
        hsl.toArray().map(e => new LavendeuxFloat(e))
    );
}

/**
 * Function that converts an array of [h,s,l] into an array of [r,g,b]
 *  Usage: hsl_to_rgb([h,s,l])
 * Can be called from the lavendeux parser
 * It takes in an array of value objects, which will have one of the following properties:
 *  Integer, Float, String
 * 
 * It then returns a value object
 * @param {Value} args 
 * @returns {Value} result
 */
globalThis.functionHSLToRGB = (args) => {
    if (args.length != 1 && args.length != 3) {
        throw new Error("hsl_to_rgb([h,s,l])|hsl_to_rgb(h,s,l): expected 1 or 3 arguments");
    }

    let values = (args.length == 1) 
        ? LavendeuxValue.asArray(args[0])
        : args.map(e => LavendeuxValue.asFloat(e));

    if (values.length != 3)
        throw new Error("hsl_to_rgb([h,s,l]): expected 3 elements");

    let hsl = new HSLColour(...values);
    let rgb = RGBColour.fromHSL(hsl);
    return LavendeuxValue.returnArray(
        rgb.toArray().map(e => new LavendeuxInteger(e))
    );
}

/**
 * Function that converts an array of [h,s,l] into an array of [r,g,b]
 *  Usage: hsl_to_rgb([h,s,l])
 * Can be called from the lavendeux parser
 * It takes in an array of value objects, which will have one of the following properties:
 *  Integer, Float, String
 * 
 * It then returns a value object
 * @param {Value} args 
 * @returns {Value} result
 */
globalThis.functionHSLToInt = (args) => {
    if (args.length != 1 && args.length != 3) {
        throw new Error("hsl_to_int([h,s,l])|hsl_to_int(h,s,l): expected 1 or 3 arguments");
    }

    let values = (args.length == 1) 
        ? LavendeuxValue.asArray(args[0])
        : args.map(e => LavendeuxValue.asFloat(e));

    if (values.length != 3)
        throw new Error("hsl_to_int([h,s,l]): expected 3 elements");

    let hsl = new HSLColour(...values);
    let rgb = RGBColour.fromHSL(hsl);
    return LavendeuxValue.returnInteger(rgb.toInt());
}

/**
 * Function that calculates the complement of an integer value representing an HTML color code
 *  Usage: complement(<int>)
 * Can be called from the lavendeux parser
 * It takes in an array of value objects, which will have one of the following properties:
 *  Integer, Float, String
 * 
 * It then returns a value object
 * @param {Value} args 
 * @returns {Value} result
 */
globalThis.functionComplement = (args) => {
    if (args.length != 1) {
        throw new Error("complement(n): expected 1 argument");
    }

    let inputValue = LavendeuxValue.asInteger(args[0]);

    // Get RBG bytes, and complement
    let rgb = RGBColour.fromInt(inputValue);
    rgb.set_r(255 - rgb.r());
    rgb.set_g(255 - rgb.g());
    rgb.set_b(255 - rgb.b());

    return LavendeuxValue.returnInteger(rgb.toInt());
}

/**
 * Function that finds an HTML color code for a color with a given name
 *  Usage: color(<string>)
 * Can be called from the lavendeux parser
 * It takes in an array of value objects, which will have one of the following properties:
 *  Integer, Float, String
 * 
 * It then returns a value object
 * @param {Value} args 
 * @returns {Value} result
 */
globalThis.functionColour = (args) => {
    if (args.length != 1) {
        throw new Error("color(s): expected 1 argument");
    }

    let colorName = LavendeuxValue.asString(args[0]).toLowerCase();

    let result = color_map[colorName];
    if (result) {
        return LavendeuxValue.returnInteger(result);
    } else {
        throw new Error(`color(s): unknown color name '${colorName}'`);
    }
}