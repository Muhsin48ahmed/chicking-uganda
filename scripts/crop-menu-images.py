"""Crop individual product photos out of the Chicking Uganda menu boards.

Usage: python3 -I scripts/crop-menu-images.py <boards_dir> <out_dir>
Boxes are (left, top, right, bottom) in the 1920x1080 board coordinates.
"""
import sys
from pathlib import Path
from PIL import Image

CROPS = {
    "led-1.jpg": {
        "crunchy-box-c1": (415, 188, 940, 440),
        "crunchy-box-c2": (40, 455, 545, 780),
        "crunchy-box-c3": (460, 655, 900, 1010),
        "royal-match": (1060, 258, 1330, 410),
        "strips-meal": (1420, 228, 1900, 550),
        "royal-snack": (1050, 676, 1400, 950),
        "budget-meal": (1395, 690, 1900, 955),
    },
    "led-2.jpg": {
        "royal-wrap": (110, 165, 500, 375),
        "tacos": (530, 95, 845, 385),
        "tandoori-burger": (20, 600, 375, 875),
        "royal-crunchy": (310, 700, 645, 955),
        "big-beef-burger": (580, 580, 930, 850),
        "crunchy-supreme": (950, 60, 1320, 305),
        "mexi-crunchy": (1185, 405, 1560, 660),
        "double-crunchy": (990, 705, 1290, 1010),
        "combo-add-on": (1580, 295, 1870, 625),
    },
    "led-3.jpg": {
        "fried-wings": (20, 140, 430, 412),
        "mexican-wings": (560, 35, 925, 335),
        "strips-rice": (60, 635, 470, 875),
        "flavoured-rice": (350, 775, 790, 1025),
        "kids-meal": (1010, 320, 1235, 565),
        "crispy-fries": (1190, 585, 1310, 745),
        "coleslaw": (1015, 785, 1110, 878),
        "tandoori-fries": (1150, 765, 1310, 925),
        "tandoori-bites": (1320, 655, 1575, 805),
        "chick-pop": (1590, 685, 1775, 885),
        "nuggets": (1370, 915, 1625, 1078),
        "drinks": (1730, 835, 1805, 1075),
    },
    "led-4.jpg": {
        "chicken-lover-bucket": (110, 210, 840, 505),
        "share-bucket": (80, 735, 830, 1035),
        "variety-bucket": (1000, 455, 1885, 1045),
    },
    "led-5.jpg": {
        "super-saver": (630, 330, 1890, 1065),
    },
}

def main(boards_dir: Path, out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    for board, boxes in CROPS.items():
        with Image.open(boards_dir / board) as img:
            for name, box in boxes.items():
                img.crop(box).convert("RGB").save(out_dir / f"{name}.webp", "WEBP", quality=86)
                print(f"{name}.webp {box[2]-box[0]}x{box[3]-box[1]}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("usage: crop-menu-images.py <boards_dir> <out_dir>")
    main(Path(sys.argv[1]), Path(sys.argv[2]))
