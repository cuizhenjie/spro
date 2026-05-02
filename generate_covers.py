#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate cyberpunk-style cover images for spro project tools
Style: Deep Space Black + Neon Pink + Emerald Green
Size: 1080×720px
"""

from PIL import Image, ImageDraw, ImageFont
import random
import math

# Tool configuration
TOOLS = [
    {'id': 'palm-reading', 'name': '手相趣味解读', 'nameEn': 'Palm & Face Reading', 'color': '#ffabf3'},
    {'id': 'style-analyzer', 'name': '风格测试', 'nameEn': 'Style Quiz', 'color': '#ecffe3'},
    {'id': 'lipstick-recommendation', 'name': '口红推荐', 'nameEn': 'Lipstick Finder', 'color': '#fbbf24'},
    {'id': 'image-diagnosis', 'name': '个人形象诊断', 'nameEn': 'Image Diagnosis', 'color': '#bfd043'},
    {'id': 'seasonal-outfit', 'name': '四季穿搭指南', 'nameEn': 'Seasonal Outfit Guide', 'color': '#ff9f43'},
    {'id': 'personal-color', 'name': '个人色彩分析', 'nameEn': 'Personal Color Analysis', 'color': '#ff6b9d'},
    {'id': 'neon-street-syndicate', 'name': '霓虹街头辛迪加', 'nameEn': 'Neon Street Syndicate', 'color': '#ff6b9d'},
    {'id': 'hardware-implant-faction', 'name': '硬件植入派', 'nameEn': 'Hardware Implant Faction', 'color': '#ff9f43'},
    {'id': 'makeup-analysis', 'name': '妆容分析', 'nameEn': 'Makeup Analysis', 'color': '#f472b6'},
]

# Cyberpunk color palette
COLORS = {
    'background': '#0a0514',      # Deep space black
    'neon_pink': '#ffabf3',       # Neon pink
    'emerald_green': '#00ffa3',   # Emerald green
    'cyan': '#00d9ff',            # Cyan accent
    'purple': '#b24bf3',          # Purple accent
    'dark_purple': '#1c0f1a',     # Dark purple overlay
}

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def draw_grid_background(draw, width, height):
    """Draw cyberpunk grid background"""
    grid_color = (30, 15, 40, 80)  # Semi-transparent purple
    grid_spacing = 40
    
    # Vertical lines
    for x in range(0, width, grid_spacing):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    
    # Horizontal lines
    for y in range(0, height, grid_spacing):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

def draw_circuit_pattern(draw, width, height, color, num_circuits=15):
    """Draw circuit-like patterns"""
    for _ in range(num_circuits):
        x = random.randint(50, width - 50)
        y = random.randint(50, height - 50)
        
        # Random circuit shape
        circuit_type = random.choice(['line', 'corner', 'cross'])
        length = random.randint(30, 100)
        
        if circuit_type == 'line':
            if random.choice([True, False]):
                draw.line([(x, y), (x + length, y)], fill=color, width=2)
            else:
                draw.line([(x, y), (x, y + length)], fill=color, width=2)
        elif circuit_type == 'corner':
            draw.line([(x, y), (x + length, y)], fill=color, width=2)
            draw.line([(x + length, y), (x + length, y + length)], fill=color, width=2)
        elif circuit_type == 'cross':
            draw.line([(x - length//2, y), (x + length//2, y)], fill=color, width=2)
            draw.line([(x, y - length//2), (x, y + length//2)], fill=color, width=2)
        
        # Add nodes
        draw.ellipse([x-3, y-3, x+3, y+3], fill=color)

def draw_neon_glow_rect(draw, bbox, color, width=3, glow_layers=3):
    """Draw rectangle with neon glow effect"""
    rgb = hex_to_rgb(color)
    
    # Outer glow layers
    for i in range(glow_layers, 0, -1):
        alpha = int(50 / i)
        glow_color = rgb + (alpha,)
        offset = i * 2
        glow_bbox = [
            bbox[0] - offset, bbox[1] - offset,
            bbox[2] + offset, bbox[3] + offset
        ]
        draw.rectangle(glow_bbox, outline=glow_color, width=width + i)
    
    # Main line
    draw.rectangle(bbox, outline=rgb + (255,), width=width)

def draw_scanlines(draw, width, height):
    """Draw subtle scanlines for CRT effect"""
    for y in range(0, height, 4):
        alpha = random.randint(5, 15)
        draw.line([(0, y), (width, y)], fill=(255, 255, 255, alpha), width=1)

def draw_glitch_bars(draw, width, height, color):
    """Draw random glitch effect bars"""
    num_bars = random.randint(2, 4)
    rgb = hex_to_rgb(color)
    
    for _ in range(num_bars):
        bar_height = random.randint(2, 5)
        y = random.randint(0, height)
        x_start = random.randint(0, width // 2)
        bar_width = random.randint(100, 300)
        
        alpha = random.randint(30, 60)
        draw.rectangle(
            [x_start, y, x_start + bar_width, y + bar_height],
            fill=rgb + (alpha,)
        )

def generate_cover_image(tool_info, output_path):
    """Generate cyberpunk cover image for a tool"""
    width, height = 1080, 720
    
    # Create base image with gradient background
    img = Image.new('RGBA', (width, height), hex_to_rgb(COLORS['background']))
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Add dark purple gradient overlay
    for y in range(height):
        alpha = int(80 * (y / height))
        draw.line([(0, y), (width, y)], fill=hex_to_rgb(COLORS['dark_purple']) + (alpha,))
    
    # Draw grid background
    draw_grid_background(draw, width, height)
    
    # Draw circuit patterns (using tool's accent color and emerald green)
    tool_color = hex_to_rgb(tool_info['color'])
    emerald = hex_to_rgb(COLORS['emerald_green'])
    
    draw_circuit_pattern(draw, width, height, tool_color + (60,), num_circuits=12)
    draw_circuit_pattern(draw, width, height, emerald + (40,), num_circuits=8)
    
    # Draw corner brackets (cyberpunk style)
    bracket_size = 40
    bracket_color = hex_to_rgb(COLORS['neon_pink'])
    bracket_width = 4
    
    # Top-left
    draw.line([(30, 30), (30 + bracket_size, 30)], fill=bracket_color, width=bracket_width)
    draw.line([(30, 30), (30, 30 + bracket_size)], fill=bracket_color, width=bracket_width)
    
    # Top-right
    draw.line([(width-30-bracket_size, 30), (width-30, 30)], fill=bracket_color, width=bracket_width)
    draw.line([(width-30, 30), (width-30, 30 + bracket_size)], fill=bracket_color, width=bracket_width)
    
    # Bottom-left
    draw.line([(30, height-30-bracket_size), (30, height-30)], fill=bracket_color, width=bracket_width)
    draw.line([(30, height-30), (30 + bracket_size, height-30)], fill=bracket_color, width=bracket_width)
    
    # Bottom-right
    draw.line([(width-30-bracket_size, height-30), (width-30, height-30)], fill=bracket_color, width=bracket_width)
    draw.line([(width-30, height-30), (width-30, height-30-bracket_size)], fill=bracket_color, width=bracket_width)
    
    # Try to load fonts, fallback to default if not available
    try:
        # Try common font paths
        font_paths = [
            '/System/Library/Fonts/PingFang.ttc',
            '/System/Library/Fonts/STHeiti Light.ttc',
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
            '/Library/Fonts/Arial Unicode.ttf',
        ]
        
        title_font = None
        subtitle_font = None
        
        for font_path in font_paths:
            try:
                title_font = ImageFont.truetype(font_path, 72)
                subtitle_font = ImageFont.truetype(font_path, 36)
                break
            except:
                continue
        
        if not title_font:
            # Fallback to default
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
            
    except Exception as e:
        print(f"Font loading failed: {e}, using default")
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Draw central frame
    frame_margin = 100
    frame_bbox = [frame_margin, height//2 - 120, width - frame_margin, height//2 + 120]
    draw_neon_glow_rect(draw, frame_bbox, tool_info['color'], width=4, glow_layers=4)
    
    # Add semi-transparent overlay inside frame
    overlay_alpha = 40
    draw.rectangle(frame_bbox, fill=hex_to_rgb(COLORS['dark_purple']) + (overlay_alpha,))
    
    # Draw text - Chinese title
    title_text = tool_info['name']
    # Get text bbox for centering
    try:
        title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
        title_width = title_bbox[2] - title_bbox[0]
        title_height = title_bbox[3] - title_bbox[1]
    except:
        # Fallback if textbbox not available
        title_width = len(title_text) * 40
        title_height = 60
    
    title_x = (width - title_width) // 2
    title_y = height // 2 - 60
    
    # Draw title with glow effect
    glow_color = hex_to_rgb(COLORS['neon_pink'])
    for offset in [(2,2), (-2,2), (2,-2), (-2,-2), (0,3), (0,-3), (3,0), (-3,0)]:
        draw.text(
            (title_x + offset[0], title_y + offset[1]),
            title_text,
            fill=glow_color + (100,),
            font=title_font
        )
    
    # Main title
    draw.text(
        (title_x, title_y),
        title_text,
        fill=(255, 255, 255),
        font=title_font
    )
    
    # Draw English subtitle
    subtitle_text = tool_info['nameEn']
    try:
        subtitle_bbox = draw.textbbox((0, 0), subtitle_text, font=subtitle_font)
        subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    except:
        subtitle_width = len(subtitle_text) * 18
    
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = title_y + 80
    
    emerald_rgb = hex_to_rgb(COLORS['emerald_green'])
    draw.text(
        (subtitle_x, subtitle_y),
        subtitle_text,
        fill=emerald_rgb + (200,),
        font=subtitle_font
    )
    
    # Add scanlines
    draw_scanlines(draw, width, height)
    
    # Add glitch bars
    draw_glitch_bars(draw, width, height, tool_info['color'])
    
    # Add decorative elements
    # Small circles at corners
    for x, y in [(80, 80), (width-80, 80), (80, height-80), (width-80, height-80)]:
        draw.ellipse([x-5, y-5, x+5, y+5], fill=emerald_rgb + (150,))
        draw.ellipse([x-8, y-8, x+8, y+8], outline=emerald_rgb + (80,), width=2)
    
    # Convert to RGB for saving (remove alpha channel)
    final_img = Image.new('RGB', (width, height), hex_to_rgb(COLORS['background']))
    final_img.paste(img, (0, 0), img)
    
    # Save
    final_img.save(output_path, 'PNG', quality=95)
    print(f"✅ Generated: {output_path}")

def main():
    """Generate all cover images"""
    import os
    
    output_dir = '/Users/cuizhenjie/Downloads/spro/public/assets'
    os.makedirs(output_dir, exist_ok=True)
    
    print("🎨 Generating cyberpunk-style cover images...")
    print(f"Style: Deep Space Black + Neon Pink + Emerald Green")
    print(f"Size: 1080×720px\n")
    
    for tool in TOOLS:
        output_path = f"{output_dir}/tool-{tool['id']}.png"
        generate_cover_image(tool, output_path)
    
    print(f"\n✨ All {len(TOOLS)} cover images generated successfully!")
    print(f"📁 Saved to: {output_dir}/")

if __name__ == '__main__':
    main()
