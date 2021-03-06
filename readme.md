[![](https://img.shields.io/badge/Linktr.ee-Thoanny-93c045?style=for-the-badge)](https://linktr.ee/thoanny)
[![](https://img.shields.io/badge/Twitch-Sub-93c045?style=for-the-badge)](https://www.twitch.tv/subs/thoanny)
[![](https://img.shields.io/badge/StreamElements-Tip-93c045?style=for-the-badge)](https://streamelements.com/thoanny/tip)

# โ๏ธStreamElements - Pixels War's widget

## ๐บ Twitch rewards's configuration
Create 9 rewards, one for each color, with different name. Set "Cost". Define "Limits" if you want too.

โ ๏ธYou need to check "Require Viewer to Enter Text". That way, StreamElements can get reward redemptions' details. Viewer use that field too for telling what pixel they want to color.

## ๐ StreamElements

1. Add new "Static / Custom" > "Custom widget"
2. "Open editor" and past content from:
    * `widget.html` to HTML
    * `widget.css` to CSS
    * `widget.js` to JS
    * `widget.json` to Fields
3. Save by clicking "Done"
4. Click on "Refresh rewards" to fetch Twitch rewards
5. Initialize Pixels War Map by setting "Pixel size" and "Canva size" (see ๐บ๏ธ Map grid, below)
6. Check "Show Pixels" to see the grid and pixels' number
7. Set each 9 colors :
    * `Color * reward` name does need to match exactly the same as Twitch Reward's name
    * `Color * value` color you which to use

If you want to reset Pixels War Map, click on "Reset Pixels".

## ๐บ๏ธ Map grid

Combinations who work:

| โ Canva / Pixels โ    | 10     | 20     | 30     | 40     | 50     | 60     | 70     | 80     | 90     | 100    |
|:---------------------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|:------:|
| **100**               | 100    | 25     | โ      | โ      | 4      | โ      | โ      | โ      | โ      | 1      |
| **200**               | 400    | 100    | โ      | 25     | 16     | โ      | โ      | โ      | โ      | 4      |
| **300**               | 900    | 225    | 100    | โ      | 36     | 25     | โ      | โ      | โ      | 9      |
| **400**               | 1.600  | 400    | โ      | 100    | 64     | โ      | โ      | 25     | โ      | 16     |
| **500**               | 2.500  | 625    | โ      | โ      | 100    | โ      | โ      | โ      | โ      | 25     |
| **600**               | 3.600  | 900    | 400    | 225    | 144    | 100    | โ      | โ      | โ      | 36     |
| **700**               | 4.900  | 1.225  | โ      | โ      | 196    | โ      | 100    | โ      | โ      | 49     |
| **800**               | 6.400  | 1.600  | โ      | 400    | 256    | โ      | โ      | 100    | โ      | 64     |
| **900**               | 8.100  | 2.025  | 900    | โ      | 324    | 225    | โ      | โ      | 100    | 81     |
| **1.000**             | 10.000 | 2.500  | โ      | 625    | 400    | โ      | โ      | โ      | โ      | 100    |

Calculation `=(canva/pixels)^2`

## ๐จ Colors

If you want more or less colors, you need to edit "Fields" in open editor and add/remove (at the end):

````json
{
    "c000name": {
        "type": "text",
        "label": "Color 000 reward name",
        "group": "Colors"
    },
    "c000color": {
        "type": "colorpicker",
        "label": "Color 000 value",
        "value": "#2ecc71",
        "group": "Colors"
    }
}
````

Replacing `000` by your number. Numbers need to start with `1` and they must follow.

And last but not least, edit `let pixelsWarColorsMax = 9;` in JS to set your max colors' number.

## โ๏ธ Need help?

You can contact me on Discord: `Anthony#6913`
