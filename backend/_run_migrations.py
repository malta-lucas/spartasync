import subprocess
import sys

def run_command(command):
    print(f"\nExecutando: {command}")
    result = subprocess.run(command, shell=True)
    if result.returncode != 0:
        print(f"\n[ERRO] Falhou ao executar: {command}")
        print(f"Código de saída: {result.returncode}")
        sys.exit(result.returncode)

# Lista de comandos na ordem
commands = [
    "python manage.py makemigrations core",
    "python manage.py migrate core",
    "python manage.py makemigrations modules",
    "python manage.py migrate modules",
    "python manage.py makemigrations tags",
    "python manage.py migrate tags",
    "python manage.py makemigrations contacts",
    "python manage.py migrate contacts",
    "python manage.py migrate"
]

for cmd in commands:
    run_command(cmd)

print("\nTodas as migrations executadas com sucesso!")
