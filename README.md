## HTML Colour Utilities
### An extension for [Lavendeux](https://rscarson.github.io/lavendeux/)

[Download Extension](https://github.com/rscarson/lavendeux-colour/releases/latest/download/lavendeux-colour.js)

Extension can be compiled using ```npm run build```, and then imported into Lavendeux for use with the parser.

Includes a colour decorator (@color / @colour) which formats an integer as an html hex colour code:
```
255 @colour = #ff0000
0xAAA @colour = #aaa000
```

Included functions are:
```javascript
complement(html_color_code: integer): Returns the complementary colour code for the given colour
    complement(0xFF0000) @colour = #ff00ff

colour(name: string): Returns the html colour code for a given named colour
    colour('beige') @colour = #f5f5dc

int_to_rgb(html_color_code: integer): Convert the given html colour code into an array of [r,g,b]
    int_to_rgb(0xFF0000) = [255, 0, 0]

rgb_to_int(r: int, g: int, b: int) or rgb_to_int(rgb_values: array): Convert the given [r,g,b] values into an html colour code
    rgb_to_int([128, 128, 128]) @colour = #808080

rgb_to_hsl(r: int, g: int, b: int) or rgb_to_hsl(rgb_values: array): Convert the given [r,g,b] values into a set of [h,s,l] values
    rgb_to_hsl(128, 128, 128) = [0.0, 0.0, 0.5]

hsl_to_int(h: float, h: float, l: float) or hsl_to_int(hsl_values: array): Convert the given [h,s,l] values into an html colour code
    hsl_to_int(0, 0, 0.5) @colour = #808080

hsl_to_rgb(h: float, s: float, l: float) or hsl_to_rgb(hsl_values: array): Convert the given [h,s,l] values into a set of [r,g,b] values
    hsl_to_rgb(0.0, 0.0, 0.5) = [128, 128, 128]
```