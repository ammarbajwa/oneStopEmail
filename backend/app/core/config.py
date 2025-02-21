from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "AI Email Agent"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here"  # Change this!
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 15  # 15 days
    
    # Google OAuth
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GOOGLE_CLIENT_SECRETS_FILE: str
    GOOGLE_REDIRECT_URI: str = "http://localhost:3000/auth/callback"
    
    # OpenAI
    OPENAI_API_KEY: str
    
    # Database
    DATABASE_URL: Optional[str] = None
    
    class Config:
        env_file = ".env"

settings = Settings()
