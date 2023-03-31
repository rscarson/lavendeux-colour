import { extensionName, author, version } from '../package.json';
import './functions';
import './decorators';

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