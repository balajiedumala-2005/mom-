from pathlib import Path
import math
import subprocess
import sys

try:
    import numpy as np
except Exception:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'numpy'])
    import numpy as np

try:
    from PIL import Image, ImageDraw, ImageFilter, ImageFont
except Exception:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Pillow'])
    from PIL import Image, ImageDraw, ImageFilter, ImageFont

try:
    import lameenc
except Exception:
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'lameenc'])
    import lameenc

root = Path(r'd:\notes\mother-birthday')
photos_dir = root / 'assets' / 'photos'
photos_dir.mkdir(parents=True, exist_ok=True)


def make_card(path, palette, title, subtitle='Love'):
    w, h = 900, 1100
    img = Image.new('RGB', (w, h), palette['bg'])
    draw = ImageDraw.Draw(img)

    for cx, cy, radius, color in [
        (w * 0.5, h * 0.24, 220, palette['glow']),
        (w * 0.22, h * 0.72, 130, palette['soft']),
        (w * 0.78, h * 0.68, 120, palette['soft2']),
    ]:
        overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        od.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=(color[0], color[1], color[2], 60))
        img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')

    draw.rounded_rectangle((60, 60, w - 60, h - 60), radius=40, outline=palette['gold'], width=12)
    draw.rounded_rectangle((90, 90, w - 90, h - 90), radius=30, outline=palette['gold2'], width=4)

    # head and body silhouette
    draw.ellipse((330, 220, 570, 440), fill=(248, 212, 193))
    draw.ellipse((300, 180, 600, 400), fill=(86, 58, 63))
    draw.ellipse((240, 430, 660, 760), fill=(105, 73, 99))
    draw.rounded_rectangle((265, 500, 335, 700), fill=(248, 212, 193), radius=30)
    draw.rounded_rectangle((565, 500, 635, 700), fill=(248, 212, 193), radius=30)
    draw.arc((360, 270, 540, 380), start=200, end=340, fill=(184, 114, 97), width=8)
    draw.ellipse((380, 310, 420, 338), fill=(0, 0, 0, 40))
    draw.ellipse((500, 310, 540, 338), fill=(0, 0, 0, 40))

    for x in [160, 740, 180, 720]:
        draw.ellipse((x, 120, x + 60, 180), fill=(245, 153, 188))
        draw.ellipse((x + 10, 160, x + 50, 200), fill=(235, 104, 145))

    try:
        title_font = ImageFont.truetype('DejaVuSerif.ttf', 54)
        sub_font = ImageFont.truetype('DejaVuSans.ttf', 28)
    except Exception:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()

    draw.text((w * 0.5, 820), title, anchor='mm', fill=palette['gold'], font=title_font)
    draw.text((w * 0.5, 890), subtitle, anchor='mm', fill=(255, 255, 255), font=sub_font)
    img = img.filter(ImageFilter.SMOOTH)
    img.save(path)

make_card(photos_dir / 'best-mom.jpg', {
    'bg': (32, 17, 27),
    'glow': (252, 220, 160),
    'soft': (255, 190, 213),
    'soft2': (194, 118, 141),
    'gold': (241, 217, 143),
    'gold2': (183, 124, 102),
}, 'Lakshmi Bhavani', 'Our Beautiful Mom')

for name, palette, title, subtitle in [
    ('mom1.jpg', {'bg': (22, 18, 35), 'glow': (253, 227, 183), 'soft': (210, 142, 173), 'soft2': (214, 165, 128), 'gold': (238, 219, 167), 'gold2': (143, 97, 122)}, 'Warm Smile', 'Sunshine in Our Home'),
    ('mom2.jpg', {'bg': (36, 24, 38), 'glow': (255, 205, 200), 'soft': (244, 179, 173), 'soft2': (192, 134, 174), 'gold': (247, 224, 176), 'gold2': (143, 105, 107)}, 'Gentle Love', 'Always Our Strength'),
    ('mom3.jpg', {'bg': (28, 17, 27), 'glow': (247, 210, 167), 'soft': (228, 207, 255), 'soft2': (149, 97, 142), 'gold': (239, 210, 147), 'gold2': (119, 86, 122)}, 'Sacrifice', "A Mother's Blessing"),
    ('family1.jpg', {'bg': (20, 24, 34), 'glow': (184, 213, 255), 'soft': (233, 205, 164), 'soft2': (190, 139, 182), 'gold': (246, 218, 165), 'gold2': (115, 118, 144)}, 'Family Love', 'Home is Where Mom Is'),
    ('childhood.jpg', {'bg': (31, 19, 31), 'glow': (252, 209, 220), 'soft': (221, 203, 255), 'soft2': (149, 140, 204), 'gold': (244, 219, 167), 'gold2': (106, 92, 129)}, 'Childhood Joy', 'Memories Begin with Her'),
]:
    make_card(photos_dir / name, palette, title, subtitle)

# Optional background music with a simple calming instrumental feel.
fs = 22050
seconds = 26
samples = int(fs * seconds)
arr = np.zeros((samples, 2), dtype=np.int16)
for i in range(samples):
    t = i / fs
    env = min(1.0, t / 2.0) * min(1.0, (seconds - t) / 4.0)
    note_a = math.sin(2 * math.pi * 220 * t) * 0.35
    note_b = math.sin(2 * math.pi * 277.18 * t) * 0.25
    note_c = math.sin(2 * math.pi * 329.63 * t) * 0.18
    pad = (note_a + note_b + note_c) * 2000 * env
    trem = 1 + 0.08 * math.sin(2 * math.pi * 3.5 * t)
    left = max(-32767, min(32767, int(pad * trem)))
    right = max(-32767, min(32767, int((pad * 0.9) * trem)))
    arr[i, 0] = left
    arr[i, 1] = right

music_path = root / 'assets' / 'music' / 'emotional-music.mp3'
music_path.parent.mkdir(parents=True, exist_ok=True)
encoder = lameenc.Encoder()
encoder.set_bit_rate(128)
encoder.set_in_sample_rate(fs)
encoder.set_channels(2)
mp3_data = encoder.encode(arr.tobytes()) + encoder.flush()
music_path.write_bytes(mp3_data)

print('Assets created successfully.')
