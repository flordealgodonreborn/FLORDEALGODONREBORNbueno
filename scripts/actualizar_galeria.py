from pathlib import Path
import json

root = Path(__file__).resolve().parents[1]
folder = root / "imagenes" / "galeria"
output = folder / "imagenes.json"

if not folder.exists():
    raise SystemExit(f"No se encontró la carpeta: {folder}")

extensiones = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".svg"}
archivos = []

for path in folder.iterdir():
    if path.is_file() and path.suffix.lower() in extensiones and path.name != "imagenes.json":
        archivos.append(path)

archivos.sort(key=lambda p: p.stat().st_mtime, reverse=True)
nombres = [p.name for p in archivos]

output.write_text(json.dumps(nombres, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Lista actualizada en {output}")
print("Archivos detectados:", nombres)
