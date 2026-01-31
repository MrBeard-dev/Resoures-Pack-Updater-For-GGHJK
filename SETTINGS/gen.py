import os
import hashlib
import json

# --- NASTAVENÍ ---
# Pokud používáš GitHub, ujisti se, že odkazuješ na "raw" obsah nebo GitHub Pages
REMOTE_URL = "https://raw.githubusercontent.com/MrBeard-dev/Resoures-Pack-Updater-For-GGHJK/main/"
# -----------------

def get_sha1(file_path):
    sha1 = hashlib.sha1()
    try:
        with open(file_path, 'rb') as f:
            while True:
                data = f.read(65536)
                if not data: break
                sha1.update(data)
        return sha1.hexdigest()
    except Exception as e:
        print(f"CHYBA: Nelze přečíst soubor {file_path}: {e}")
        return None

def run():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    if not current_dir:
        current_dir = "."
    
    files_data = {}
    
    # Automatické zjištění aktuálního buildu
    build_file = os.path.join(current_dir, "dynamicmcpack.repo.build")
    if os.path.exists(build_file):
        with open(build_file, "r") as f:
            try:
                current_build = int(f.read().strip()) + 1
            except:
                current_build = 1
    else:
        current_build = 1

    # Ignorované soubory a složky
    exclude = ["gen.py", "content.json", "dynamicmcpack.repo.json", "dynamicmcpack.repo.build", ".git", ".gitignore", "desktop.ini"]

    print(f"Spouštím generování (Build: {current_build})...")

    # 1. Skenování souborů
    for root, dirs, files in os.walk(current_dir):
        # Ignorovat skryté složky (začínající tečkou)
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            if file in exclude or any(ex in root for ex in [".git", ".idea"]):
                continue
            
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, current_dir).replace("\\", "/")
            
            file_hash = get_sha1(full_path)
            if file_hash:
                files_data[rel_path] = {
                    "hash": file_hash,
                    "size": os.path.getsize(full_path)
                }
                print(f"OK: {rel_path}")

    # 2. Vytvoření content.json
    content_json = {
        "formatVersion": 1,
        "content": {
            "parent": "",
            "remote_parent": "",
            "files": files_data
        }
    }
    with open("content.json", "w", encoding="utf-8") as f:
        json.dump(content_json, f, indent=2)

    # 3. Vytvoření dynamicmcpack.repo.json
    # Musíme nejdřív získat hash nově vytvořeného content.json
    content_hash = get_sha1("content.json")

    repo_json = {
        "formatVersion": 1,
        "build": current_build,
        "name": "ServerPack",
        "contents": [
            {
                "id": "main",
                "url": "content.json",
                "hash": content_hash,
                "required": True
            }
        ]
    }
    with open("dynamicmcpack.repo.json", "w", encoding="utf-8") as f:
        json.dump(repo_json, f, indent=2)

    # 4. Aktualizace .build souboru
    with open("dynamicmcpack.repo.build", "w") as f:
        f.write(str(current_build))

    print(f"\n--- HOTOVO! ---")
    print(f"Aktuální build: {current_build}")
    print(f"Zpracováno souborů: {len(files_data)}")
    print(f"Nezapomeň nahrát změny na GitHub!")
    input("\nStiskni Enter pro ukončení...")

if __name__ == "__main__":
    run()