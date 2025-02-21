from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    id: str
    email: str
    full_name: str
    
class UserPreferences(BaseModel):
    theme: Optional[str] = None
    emailsPerPage: Optional[int] = 20

class Email(BaseModel):
    id: str
    subject: str
    sender: str
    preview: str
    date: str
    category: str
    isRead: bool

class EmailDetail(Email):
    body: str
    aiResponse: Optional[str] = None

class CategoryUpdate(BaseModel):
    category: str

class EmailResponse(BaseModel):
    response: str

class AIResponse(BaseModel):
    content: str
    tone: str
    confidence_score: float
