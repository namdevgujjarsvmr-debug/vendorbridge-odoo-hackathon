from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from .config import JWT_ALGORITHM, JWT_SECRET
from .database import fetch_one

bearer = HTTPBearer(auto_error=False)


def create_token(user, remember_me=False):
    expires = datetime.now(timezone.utc) + timedelta(days=30 if remember_me else 1)
    payload = {
        "sub": str(user["id"]),
        "email": user["email"],
        "role": user["role"],
        "company": user["company"],
        "exp": expires,
        "iss": "supplysaathi",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Missing bearer token")

    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except JWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid or expired token") from exc

    user = fetch_one(
        "select id, name, email, role, company, created_at from app_users where id = %s",
        (payload["sub"],),
    )
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user
