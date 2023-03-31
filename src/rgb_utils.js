/**
 * A byte array colour value
 */
export class Colour {
    constructor(values) {
        this.values = values;
    }

    /**
     * Convert this RGB object into an array
     * @returns integer
     */
    toArray() {
        return this.values;
    }

    /**
     * Convert an integer value into a colour
     * @param {int} value 
     * @returns Colour
     */
    static fromInt(value, nComponents) {
        let offset = (nComponents - 1) * 8;
        let output = new Colour([]);
        for (let i=0; i<nComponents; i++) {
            output.values.push((value >> offset) & 0xFF);
            offset -= 8;
        }
        
        return output;
    }

    /**
     * Convert this colour into an integer
     * @returns integer
     */
    toInt() {
        let values = this.toArray();
        let output = 0;
        for (let v in values) {
            output <<= 8;
            output |= values[v];
        }

        return output;
    }
}

export class RGBColour extends Colour {
    constructor(r, g, b) {
        super([r, g, b]);
    }

    r() { return this.values[0]}
    set_r(v) { this.values[0] = v; }

    g() { return this.values[1]}
    set_g(v) { this.values[1] = v; }

    b() { return this.values[2]}
    set_b(v) { this.values[2] = v; }

    /**
     * Convert an integer value into a colour
     * @param {int} value 
     * @returns Colour
     */
    static fromInt(value) {
        return new RGBColour(...super.fromInt(value, 3).values);
    }

    /**
     * Get an RGB value from an HSL colour
     * @param {HSLColour} value
     * @returns RGB object
     */
    static fromHSL(value) {
        // Calculates a colour from pieces
        function getColourComponent(v, t1, t2) {
            while (v > 1.0) v -= 1.0;
            while (v < 0.0) v += 1.0;

            if (6 * v < 1) {
                v = t2 + (t1 - t2) * 6 * v;
            } else if (2 * v < 1) {
                v = t1;
            } else if (3 * v < 2) {
                v = t2 + (t1 - t2) * (0.666 - v) * 6;
            } else {
                v = t2;
            }

            return Math.round(255 * v);
        }

        // Extract components
        let [h, s, l] = [value.h(), value.s(), value.l()];

        // If there's no saturation, it's greyscale
        if (s == 0) {
            let v = Math.round(l*255);
            return new RGBColour(v, v, v);
        }

        // Calculate temporary values, and convert hue to a percentage
        let t1 = (l < 0.5) ? l * (1.0 + s) : l + s - l * s;
        let t2 = 2 * l - t1;
        let pHue = h/360;

        // Get colour components
        let r = getColourComponent(pHue + 0.333, t1, t2);
        let g = getColourComponent(pHue, t1, t2);
        let b = getColourComponent(pHue - 0.333, t1, t2);

        return new RGBColour(r,g,b);
    }
}

export class HSLColour extends Colour {
    constructor(h, s, l) {
        super([h, s, l]);
    }

    h() { return this.values[0]}
    set_h(v) { this.values[0] = v; }

    s() { return this.values[1]}
    set_s(v) { this.values[1] = v; }

    l() { return this.values[2]}
    set_l(v) { this.values[2] = v; }

    /**
     * Convert an integer value into a colour
     * @param {int} value 
     * @returns Colour
     */
    static fromInt(value) {
        return new HSLColour(...super.fromInt(value, 3).values);
    }


    /**
     * Get an HSL value from an RGB colour
     * @param {RGBColour} value
     * @returns HSL object
     */
    static fromRGB(value) {
        // Get percentage values for colour components
        // as well as min-max values from them
        let [pR, pG, pB] = value.toArray().map(e => e / 255.0);
        let min = Math.min(pR, pG, pB);
        let max = Math.max(pR, pG, pB);

        // Calculate luminosity
        let l = (min + max)/2;

        // Calculate saturation
        let s = (min == max)
        ? 0
        : (l <= 0.5)
            ? (max - min)/(max + min)
            : (max + min)/(2.0 - max - min);

        // Calculate hue
        let h = (s == 0)
            ? 0
            : (max == pR)
                ? (pG - pB)/(max - min)
                : (max == pG)
                    ? 2.0 + (pB - pR)/(max - min)
                    : 4.0 + (pR - pG)/(max - min);
        h *= 60;
        while (h < 0) h += 360;

        // Rounding
        h = Math.round(h);
        s = Math.round(100 * s) / 100;
        l = Math.round(100 * l) / 100;
          
        return new HSLColour(h, s, l);
    }
}