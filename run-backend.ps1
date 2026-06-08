$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

python -B backend\scripts\create_db.py
python -B -m uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
