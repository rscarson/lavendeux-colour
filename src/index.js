import { extensionName, author, version } from '../package.json';
import { RGBColour, HSLColour } from './rgb_utils.js';
import color_map from './colour_names.js';

globalThis.extension = () => {
    return {
        name: `${extensionName}`,
        author: `${author}`,
        version: `${version}`,

        functions: {
            "complement": "functionComplement",
            "colour": "functionColour", "color": "functionColour",
            "int_to_rgb": "functionIntToRGB",
            "rgb_to_int": "functionRGBToInt",
            "rgb_to_hsl": "functionRGBToHSL",
            "hsl_to_rgb": "functionHSLToRGB",
            "hsl_to_int": "functionHSLToInt",
        },

        decorators: {
            "color": "decoratorColour", "colour": "decoratorColour"
        }
    }
}


lavendeuxExtensionName(`${extensionName}`);
lavendeuxExtensionAuthor(`${author}`);
lavendeuxExtensionVersion(`${version}`);

lavendeuxDecorator(
    'color',
    (input) => `#${(input & 0x00FFFFFF).toString(16).padEnd(6, '0')}`,
    lavendeuxType.Int
);

lavendeuxFunction('color', (name) => {
    if (color_map[name]) {
        return color_map[name];
    }
    return 0;
}, {
    description: "Converts a colour name to a hex code.",
    arguments: [ lavendeuxType.String ],
    returns: lavendeuxType.Int
})

lavendeuxFunction('complement', (input) => {
    // Get RBG bytes, and complement
    let rgb = RGBColour.fromInt(input);
    rgb.set_r(255 - rgb.r());
    rgb.set_g(255 - rgb.g());
    rgb.set_b(255 - rgb.b());

    rgb.toInt()
}, {
    description: "Returns the complement of a colour.",
    arguments: [ lavendeuxType.Int ],
    returns: lavendeuxType.Int
});

lavendeuxFunction('int_to_rgb', (input) => {
    let rgb = RGBColour.fromInt(input);
    return [ rgb.r(), rgb.g(), rgb.b() ];
}, {
    description: "Converts a colour integer to an RGB array.",
    arguments: [ lavendeuxType.Int ],
    returns: lavendeuxType.Array
});

lavendeuxFunction('rgb_to_int', (input) => {
    let rgb = new RGBColour(...input);
    return rgb.toInt();
}, {
    description: "Converts an RGB array to a colour integer.",
    arguments: [ lavendeuxType.Array ],
    returns: lavendeuxType.Int
});

lavendeuxFunction('rgb_to_hsl', (input) => {
    let rgb = new RGBColour(...input);
    let hsl = rgb.toHSL();
    return [ hsl.h(), hsl.s(), hsl.l() ];
} , {
    description: "Converts an RGB array to an HSL array.",
    arguments: [ lavendeuxType.Array ],
    returns: lavendeuxType.Array
});

lavendeuxFunction('hsl_to_rgb', (input) => {
    let hsl = new HSLColour(...input);
    let rgb = hsl.toRGB();
    return [ rgb.r(), rgb.g(), rgb.b() ];
}, {
    description: "Converts an HSL array to an RGB array.",
    arguments: [ lavendeuxType.Array ],
    returns: lavendeuxType.Array
});

lavendeuxFunction('hsl_to_int', (input) => {
    let hsl = new HSLColour(...input);
    let rgb = hsl.toRGB();
    return rgb.toInt();
}, {
    description: "Converts an HSL array to a colour integer.",
    arguments: [ lavendeuxType.Array ],
    returns: lavendeuxType.Int
});
