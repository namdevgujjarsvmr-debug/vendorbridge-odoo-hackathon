import os
from pathlib import Path

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parents[2]
ROOT_ENV_FILE = ROOT_DIR / ".env"
BACKEND_ENV_FILE = Path(__file__).resolve().parents[1] / ".env"

if ROOT_ENV_FILE.exists():
    load_dotenv(ROOT_ENV_FILE)
elif BACKEND_ENV_FILE.exists():
    load_dotenv(BACKEND_ENV_FILE)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/supplysaathi")
if os.getenv("PGSSL", "false").lower() == "false" and "sslmode=" not in DATABASE_URL:
    separator = "&" if "?" in DATABASE_URL else "?"
    DATABASE_URL = f"{DATABASE_URL}{separator}sslmode=disable"
JWT_SECRET = os.getenv("JWT_SECRET", "dev-supplysaathi-change-me")
JWT_ALGORITHM = "HS256"
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
