# SupplySaathi FastAPI Backend

## Setup

Create a root `.env` from `.env.example`, update `DATABASE_URL` with your real PostgreSQL username/password, then run:

```powershell
python -m venv backend\.venv
.\backend\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
python backend\scripts\create_db.py
uvicorn backend.app.main:app --reload --port 8000
```

The app creates and seeds the tables on startup.

Default login:

- Email: `admin@supplysaathi.in`
- Password: `SupplySaathi@123`
