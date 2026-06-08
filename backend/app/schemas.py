from datetime import date
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    rememberMe: bool = False


class RegisterIn(BaseModel):
    name: str = Field(min_length=2)
    email: EmailStr
    password: str = Field(min_length=8)
    role: str = "Procurement Lead"
    company: str = "SupplySaathi"


class VendorIn(BaseModel):
    name: str
    category: str
    location: str
    contact: EmailStr
    status: str = "Pending"
    rating: float = 4.0
    onTime: int = 85
    spend: float = 0


class RFQIn(BaseModel):
    title: str
    category: str
    priority: str = "Medium"
    deadline: Optional[date] = None
    vendors: int = 0
    status: str = "Open"
    createdBy: str = "Procurement Team"
    notes: str = ""


class ApprovalStatusIn(BaseModel):
    status: str
    remarks: str = ""


class StatusIn(BaseModel):
    status: str
