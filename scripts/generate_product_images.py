#!/usr/bin/env python3
"""Generate cyberpunk-style product images for spro project."""

from PIL import Image, ImageDraw, ImageFont
import os

# Output directory
OUTPUT_DIR = "/Users/cuizhenjie/Downloads/spro/public/assets"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SIZE = (800, 800)

# Cyberpunk color palette
COLORS = {
    "bg": (28, 15, 26),         # #1c0f1a - dark purple-black
    "neon_pink": (255, 171, 243), # #ffabf3
    "neon_green": (236, 255, 227), # #ecffe3
    "amber": (255, 224, 74),      # #ffe04a
    "grid": (48, 40, 64),         # #302840
    "glass": (20, 20, 34),        # #141422
    "text": (232, 224, 240),       # #e8e0f0
}

def create_grid_overlay(draw, w, h):
    """Draw cyberpunk grid lines."""
    grid_spacing = 50
    # Vertical lines
    for x in range(0, w, grid_spacing):
        draw.line([(x, 0), (x, h)], fill=COLORS["grid"], width=1)
    # Horizontal lines
    for y in range(0, h, grid_spacing):
        draw.line([(0, y), (w, y)], fill=COLORS["grid"], width=1)

def create_corner_brackets(draw, w, h, color, size=40, thickness=3):
    """Draw HUD-style corner brackets."""
    s = size
    t = thickness
    # Top-left
    draw.line([(0, 0), (s, 0)], fill=color, width=t)
    draw.line([(0, 0), (0, s)], fill=color, width=t)
    # Top-right
    draw.line([(w-s, 0), (w, 0)], fill=color, width=t)
    draw.line([(w, 0), (w, s)], fill=color, width=t)
    # Bottom-left
    draw.line([(0, h-s), (0, h)], fill=color, width=t)
    draw.line([(0, h), (s, h)], fill=color, width=t)
    # Bottom-right
    draw.line([(w, h-s), (w, h)], fill=color, width=t)
    draw.line([(w-s, h), (w, h)], fill=color, width=t)

def create_product_image(product_id, product_name, rarity, output_file):
    """Generate a cyberpunk product image."""
    w, h = SIZE
    img = Image.new("RGBA", (w, h), COLORS["bg"])
    draw = ImageDraw.Draw(img)

    # Grid overlay
    create_grid_overlay(draw, w, h)

    # Center product area (glass card style)
    margin = 80
    card_top = margin + 60
    card_bottom = h - margin - 60
    card_left = margin
    card_right = w - margin

    # Glass panel
    glass_color = (*COLORS["glass"], 200)
    draw.rounded_rectangle(
        [card_left, card_top, card_right, card_bottom],
        radius=20,
        fill=glass_color
    )

    # Rarity color
    rarity_colors = {
        "COMMON": COLORS["text"],
        "RARE": COLORS["neon_green"],
        "EPIC": COLORS["neon_pink"],
        "LEGENDARY": COLORS["amber"],
    }
    rc = rarity_colors.get(rarity, COLORS["neon_pink"])

    # Product icon/silhouette (simplified geometric representation)
    icon_center_x = w // 2
    icon_center_y = card_top + (card_bottom - card_top) // 2 - 20

    if "trench" in product_id.lower() or "tokyo" in product_id.lower():
        # Trench coat silhouette - rectangular form with collar
        coat_left = icon_center_x - 100
        coat_right = icon_center_x + 100
        coat_top = icon_center_y - 130
        coat_bottom = icon_center_y + 130
        draw.rectangle([coat_left, coat_top, coat_right, coat_bottom], fill=(*COLORS["glass"], 180))
        # Collar
        draw.polygon([
            (coat_left + 20, coat_top),
            (coat_right - 20, coat_top),
            (coat_right, coat_top + 50),
            (coat_left, coat_top + 50),
        ], fill=(*rc, 150))
        # Belt
        draw.rectangle([coat_left, icon_center_y - 10, coat_right, icon_center_y + 10], fill=(*rc, 200))
        # Sleeves
        draw.rectangle([coat_left - 40, coat_top + 50, coat_left, coat_bottom - 80], fill=(*COLORS["glass"], 180))
        draw.rectangle([coat_right, coat_top + 50, coat_right + 40, coat_bottom - 80], fill=(*COLORS["glass"], 180))

    elif "visor" in product_id.lower() or "wasteland" in product_id.lower():
        # Visor/goggles - horizontal oval with lenses
        lens_y = icon_center_y - 20
        # Frame
        draw.ellipse([icon_center_x - 160, lens_y - 60, icon_center_x + 160, lens_y + 60], fill=(*COLORS["glass"], 200))
        # Left lens
        draw.ellipse([icon_center_x - 140, lens_y - 40, icon_center_x - 20, lens_y + 40], fill=(*rc, 180))
        # Right lens
        draw.ellipse([icon_center_x + 20, lens_y - 40, icon_center_x + 140, lens_y + 40], fill=(*rc, 180))
        # Bridge
        draw.rectangle([icon_center_x - 20, lens_y - 10, icon_center_x + 20, lens_y + 10], fill=(*rc, 200))
        # Arms/straps
        draw.line([(card_left + 40, lens_y), (icon_center_x - 160, lens_y)], fill=(*COLORS["grid"], 255), width=8)
        draw.line([(icon_center_x + 160, lens_y), (card_right - 40, lens_y)], fill=(*COLORS["grid"], 255), width=8)

    elif "gauntlet" in product_id.lower() or "haptic" in product_id.lower():
        # Gloves - hand outlines with sensor nodes
        for hand_x in [icon_center_x - 100, icon_center_x + 100]:
            # Palm
            draw.ellipse([hand_x - 50, icon_center_y - 60, hand_x + 50, icon_center_y + 80], fill=(*COLORS["glass"], 200))
            # Fingers (simplified)
            for i, dx in enumerate([-30, -10, 10, 30]):
                fx = hand_x + dx
                draw.rectangle([fx - 8, icon_center_y - 120, fx + 8, icon_center_y - 60], fill=(*rc, 180))
            # Sensor nodes
            for sx, sy in [(hand_x, icon_center_y - 80), (hand_x - 30, icon_center_y), (hand_x + 30, icon_center_y)]:
                draw.ellipse([sx - 12, sy - 12, sx + 12, sy + 12], fill=(*rc, 220))
                draw.ellipse([sx - 6, sy - 6, sx + 6, sy + 6], fill=(*COLORS["amber"], 220))

    elif "corpo" in product_id.lower() or "suit" in product_id.lower():
        # Suit - torso outline
        suit_left = icon_center_x - 90
        suit_right = icon_center_x + 90
        suit_top = icon_center_y - 140
        suit_bottom = icon_center_y + 140
        draw.polygon([
            (icon_center_x, suit_top),
            (suit_right, suit_top + 40),
            (suit_right, suit_bottom - 40),
            (icon_center_x, suit_bottom),
            (suit_left, suit_bottom - 40),
            (suit_left, suit_top + 40),
        ], fill=(*COLORS["glass"], 200))
        # Lapels
        draw.polygon([
            (icon_center_x, suit_top + 20),
            (suit_left + 20, suit_top + 80),
            (icon_center_x, suit_top + 60),
        ], fill=(*rc, 160))
        draw.polygon([
            (icon_center_x, suit_top + 20),
            (suit_right - 20, suit_top + 80),
            (icon_center_x, suit_top + 60),
        ], fill=(*rc, 160))
        # Tie/lanyard
        draw.polygon([
            (icon_center_x, suit_top + 80),
            (icon_center_x - 15, suit_top + 160),
            (icon_center_x, suit_bottom - 60),
            (icon_center_x + 15, suit_top + 160),
        ], fill=(*COLORS["amber"], 200))
        # LED strip accents
        draw.rectangle([suit_left + 10, suit_top + 100, suit_right - 10, suit_top + 110], fill=(*rc, 200))
        draw.rectangle([suit_left + 10, suit_bottom - 100, suit_right - 10, suit_bottom - 90], fill=(*rc, 200))

    elif "neon" in product_id.lower() or "runner" in product_id.lower() or "shoe" in product_id.lower():
        # Sneaker - side profile shape
        for shoe_x in [icon_center_x - 80, icon_center_x + 80]:
            # Sole
            draw.rectangle([shoe_x - 70, icon_center_y + 60, shoe_x + 70, icon_center_y + 90], fill=(*COLORS["glass"], 200))
            # Upper
            draw.polygon([
                (shoe_x - 70, icon_center_y + 60),
                (shoe_x - 70, icon_center_y),
                (shoe_x - 30, icon_center_y - 80),
                (shoe_x + 50, icon_center_y - 80),
                (shoe_x + 70, icon_center_y - 20),
                (shoe_x + 70, icon_center_y + 60),
            ], fill=(*COLORS["glass"], 200))
            # Neon laces/accent
            draw.line([(shoe_x - 30, icon_center_y - 60), (shoe_x + 20, icon_center_y - 60)], fill=(*rc, 220), width=4)
            draw.line([(shoe_x - 30, icon_center_y - 40), (shoe_x + 20, icon_center_y - 40)], fill=(*rc, 220), width=4)
            draw.line([(shoe_x - 30, icon_center_y - 20), (shoe_x + 20, icon_center_y - 20)], fill=(*rc, 220), width=4)
            # Heel tab
            draw.rectangle([shoe_x - 70, icon_center_y - 100, shoe_x - 50, icon_center_y + 60], fill=(*rc, 200))

    else:
        # Generic digital/data product - holographic card
        card_w = 280
        card_h = 200
        card_l = icon_center_x - card_w // 2
        card_t = icon_center_y - card_h // 2
        # Card body
        draw.rounded_rectangle([card_l, card_t, card_l + card_w, card_t + card_h], radius=15, fill=(*COLORS["glass"], 200))
        # Data lines
        for i in range(6):
            line_y = card_t + 30 + i * 25
            lw = 100 + (i % 3) * 40
            draw.rectangle([card_l + 20, line_y, card_l + 20 + lw, line_y + 10], fill=(*rc, 150 + i * 10))
        # Corner holographic marks
        for cx, cy in [(card_l + 30, card_t + 30), (card_l + card_w - 30, card_t + 30),
                        (card_l + 30, card_t + card_h - 30), (card_l + card_w - 30, card_t + card_h - 30)]:
            draw.ellipse([cx - 8, cy - 8, cx + 8, cy + 8], fill=(*COLORS["amber"], 200))

    # Corner brackets
    create_corner_brackets(draw, w, h, rc, size=50, thickness=4)

    # Scan line effect (horizontal lines)
    for y in range(0, h, 4):
        alpha = 15 if y % 8 == 0 else 8
        draw.line([(0, y), (w, y)], fill=(*COLORS["grid"], alpha))

    # Product name text (bottom area)
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/SF Pro Display.otf", 36)
        font_small = ImageFont.truetype("/System/Library/Fonts/SF Mono.ttf", 24)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Name badge background
    badge_y = h - margin - 10
    name_text = product_name
    bbox = draw.textbbox((0, 0), name_text, font=font_large)
    text_w = bbox[2] - bbox[0]
    text_x = (w - text_w) // 2
    draw.rectangle([text_x - 20, badge_y - 50, text_x + text_w + 20, badge_y], fill=(*COLORS["glass"], 230))
    draw.text((text_x, badge_y - 45), name_text, fill=rc, font=font_large)

    # Rarity badge (top right)
    rarity_text = f"[{rarity}]"
    rbbox = draw.textbbox((0, 0), rarity_text, font=font_small)
    rw = rbbox[2] - rbbox[0]
    draw.rectangle([w - margin - rw - 20, margin, w - margin, margin + 40], fill=(*COLORS["glass"], 220))
    draw.text((w - margin - rw - 10, margin + 5), rarity_text, fill=rc, font=font_small)

    # Save
    img.save(output_file, "PNG")
    print(f"Generated: {output_file}")

# Generate all 6 product images
products = [
    ("prod_neo_tokyo_trench", "NEO_TOKYO_TRENCH", "EPIC"),
    ("prod_wasteland_visor", "WASTELAND_VISOR", "RARE"),
    ("prod_haptic_gauntlets", "HAPTIC_GAUNTLETS", "LEGENDARY"),
    ("prod_corpo_suit", "CORPO_SUIT_PRO", "EPIC"),
    ("prod_neon_runner", "NEON_RUNNER_V3", "RARE"),
    ("prod_style_pack_y2k", "Y2K_STYLE_PACK", "COMMON"),
]

for prod_id, name, rarity in products:
    output_path = os.path.join(OUTPUT_DIR, f"product-{prod_id}.png")
    create_product_image(prod_id, name, rarity, output_path)

print("\nAll images generated!")
