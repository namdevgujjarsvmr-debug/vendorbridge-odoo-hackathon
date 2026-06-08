from contextlib import contextmanager

import psycopg
from psycopg.rows import dict_row

from .config import DATABASE_URL


@contextmanager
def get_conn():
    conn = psycopg.connect(DATABASE_URL, row_factory=dict_row)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def fetch_all(sql, params=None):
    with get_conn() as conn:
        return conn.execute(sql, params or ()).fetchall()


def fetch_one(sql, params=None):
    with get_conn() as conn:
        return conn.execute(sql, params or ()).fetchone()


def execute_one(sql, params=None):
    with get_conn() as conn:
        return conn.execute(sql, params or ()).fetchone()


def init_db():
    with get_conn() as conn:
        schema_path = __import__("pathlib").Path(__file__).resolve().parents[2] / "db" / "schema.sql"
        conn.execute(schema_path.read_text(encoding="utf-8"))
