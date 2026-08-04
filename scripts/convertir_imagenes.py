from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]

for path in root.rglob('*.webp'):
    if 'imagenes' in str(path) or 'artículos' in str(path):
        out = path.with_suffix('.jpg')
        if out.exists():
            continue
        try:
            with Image.open(path) as img:
                img.convert('RGB').save(out, 'JPEG', quality=90)
            print(f'Converted {path.name} -> {out.name}')
        except Exception as e:
            print(f'Failed {path.name}: {e}')
