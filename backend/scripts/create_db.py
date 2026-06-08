import os
from pathlib import Path
from urllib.parse import urlparse, urlunparse

from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parents[2]
ROOT_ENV_FILE = ROOT_DIR / ".env"
BACKEND_ENV_FILE = Path(__file__).resolve().parents[1] / ".env"

if ROOT_ENV_FILE.exists():
    load_dotenv(ROOT_ENV_FILE)
elif BACKEND_ENV_FILE.exists():
    load_dotenv(BACKEND_ENV_FILE)

# Read DATABASE_URL or use defaults
raw = os.environ.get('DATABASE_URL')
if not raw:
    raw = "postgresql://postgres:postgres@127.0.0.1:5432/postgres"

p = urlparse(raw)
database_name = p.path.lstrip("/") or "supplysaathi"
# Ensure we connect to the 'postgres' admin DB for creation
admin_parts = (p.scheme, p.netloc, '/postgres', p.params, p.query, p.fragment)
admin_url = urlunparse(admin_parts)

try:
    import psycopg
    from psycopg import sql
except Exception as e:
    print("psycopg not installed or import failed:", e)
    raise


def ensure_db():
    try:
        conn = psycopg.connect(admin_url, autocommit=True)
    except Exception as e:
        print("Cannot connect to Postgres server:", e)
        print()
        print("Fix: update DATABASE_URL in the project .env file with your real PostgreSQL username/password.")
        print("Example: DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/supplysaathi")
        return 2
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM pg_database WHERE datname=%s", (database_name,))
            if not cur.fetchone():
                try:
                    cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(database_name)))
                    print(f'Created database {database_name}')
                except Exception as e:
                    print('Failed to create database:', e)
                    return 3
            else:
                print(f'Database {database_name} already exists')
    finally:
        conn.close()
    return 0


if __name__ == '__main__':
    import sys
    sys.exit(ensure_db())
