import os
import shutil
import glob
from datetime import datetime

# Configure o nome do seu banco
db_file = "db.sqlite3"

# Apps que você quer limpar/backup das migrations
apps = ["core", "modules", "contacts", "tags"]

# Pasta onde vai guardar os backups
backup_dir = f"_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

def backup():
    print(f"Criando backup em: {backup_dir}")
    os.makedirs(backup_dir, exist_ok=True)

    # Backup do banco
    if os.path.exists(db_file):
        shutil.copy(db_file, os.path.join(backup_dir, db_file))
        print(f"Banco {db_file} copiado.")
    else:
        print(f"Banco {db_file} não existe.")

    # Backup das pastas migrations
    for app in apps:
        mig_path = os.path.join(app, "migrations")
        if os.path.exists(mig_path):
            shutil.copytree(mig_path, os.path.join(backup_dir, f"{app}_migrations"))
            print(f"Migrations de {app} copiadas.")
        else:
            print(f"Pasta migrations de {app} não existe.")

def clean():
    print("\nLimpando banco e migrations...\n")

    # Remove banco
    if os.path.exists(db_file):
        os.remove(db_file)
        print(f"Banco {db_file} removido.")
    else:
        print(f"Banco {db_file} já não existe.")

    # Remove pastas migrations (mantendo __init__.py)
    for app in apps:
        mig_path = os.path.join(app, "migrations")
        if os.path.exists(mig_path):
            # Remove todos arquivos, exceto __init__.py
            for file in glob.glob(os.path.join(mig_path, "*.py")):
                if not file.endswith("__init__.py"):
                    os.remove(file)
            for file in glob.glob(os.path.join(mig_path, "*.pyc")):
                os.remove(file)
            # Remove as subpastas dentro de migrations (se houver)
            for dirpath, dirnames, filenames in os.walk(mig_path):
                for dirname in dirnames:
                    shutil.rmtree(os.path.join(dirpath, dirname))
            print(f"Pastas de migrations de {app} limpas (exceto __init__.py).")
        else:
            print(f"Pasta migrations de {app} não existe.")

if __name__ == "__main__":
    print("O que você deseja fazer?\n")
    print("1 - Backup (banco e migrations)")
    print("2 - Limpar (remover banco e migrations)")
    escolha = input("\nDigite 1 ou 2: ").strip()
    if escolha == "1":
        backup()
    elif escolha == "2":
        clean()
    else:
        print("Opção inválida.")
