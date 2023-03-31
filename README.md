## HTML Colour Utilities
### An extension for [Lavendeux](https://rscarson.github.io/lavendeux/)

[Download Extension](https://github.com/rscarson/lavendeux-colour/releases/latest/download/lavendeux-colour.js)

Extension can be compiled using ```npm run build```, and then imported into Lavendeux for use with the parser.

Included functions are:
```
complement(html_color_code: integer): Returns the complementary colour code for the given colour
    complement(0xFF00) @colour = #ff00ff
colour(name: string): Returns the html colour code for a given named colour
    colour('beige') @colour = #f5f5dc
int_to_rgb(html_color_code: integer): Convert the given html colour code into an array of [r,g,b]
rgb_to_int(r: int, g: int, b: int) or rgb_to_int(rgb_values: array): Convert the given [r,g,b] values into an html colour code
    rgb_to_int([128, 128, 128]) @colour = #808080
rgb_to_hsl(html_color_code: integer)
hsl_to_rgb()
hsl_to_int(h: int, h: int, l: int) or hsl_to_int(hsl_values: array): Convert the given [h,s,l] values into an html colour code
    hsl_to_int([0, 0, 0.5]) @colour = #808080
```