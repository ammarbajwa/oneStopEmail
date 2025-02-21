# from typing import Optional
# from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import JWTError, jwt
# from datetime import datetime, timedelta
# from ..models import schemas
# from ..core.config import settings
# from google.oauth2.credentials import Credentials
# from google_auth_oauthlib.flow import Flow
# from googleapiclient.discovery import build

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# class AuthService:
#     def __init__(self):
#         self.oauth_flow = Flow.from_client_secrets_file(
#             settings.GOOGLE_CLIENT_SECRETS_FILE,
#             scopes=[
#                 'https://www.googleapis.com/auth/gmail.modify',
#                 'https://www.googleapis.com/auth/userinfo.profile',
#                 'https://www.googleapis.com/auth/userinfo.email'
#             ]
#         )

#     async def authenticate_google(self, code: str) -> schemas.Token:
#         """Handle Google OAuth authentication"""
#         try:
#             # Exchange code for credentials
#             self.oauth_flow.fetch_token(code=code)
#             credentials = self.oauth_flow.credentials

#             # Get user info from Google
#             user_info = await self.get_google_user_info(credentials)
            
#             # Create or update user in database
#             user = await self.upsert_user(user_info, credentials)
            
#             # Generate JWT token
#             access_token = self.create_access_token(user.id)
            
#             return schemas.Token(
#                 access_token=access_token,
#                 token_type="bearer"
#             )

#         except Exception as e:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail=f"Could not authenticate: {str(e)}"
#             )

#     async def get_current_user(
#         self,
#         token: str = Depends(oauth2_scheme)
#     ) -> schemas.User:
#         """Get current user from JWT token"""
#         credentials_exception = HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Could not validate credentials",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
        
#         try:
#             # Decode JWT token
#             payload = jwt.decode(
#                 token,
#                 settings.SECRET_KEY,
#                 algorithms=[settings.ALGORITHM]
#             )
#             user_id: str = payload.get("sub")
#             if user_id is None:
#                 raise credentials_exception
            
#             # Get user from database
#             user = await self.get_user_by_id(user_id)
#             if user is None:
#                 raise credentials_exception
                
#             return user

#         except JWTError:
#             raise credentials_exception

#     def create_access_token(
#         self,
#         user_id: str,
#         expires_delta: Optional[timedelta] = None
#     ) -> str:
#         """Create JWT access token"""
#         to_encode = {"sub": user_id}
#         if expires_delta:
#             expire = datetime.utcnow() + expires_delta
#         else:
#             expire = datetime.utcnow() + timedelta(days=15)
#         to_encode.update({"exp": expire})
        
#         encoded_jwt = jwt.encode(
#             to_encode,
#             settings.SECRET_KEY,
#             algorithm=settings.ALGORITHM
#         )
        
#         return encoded_jwt

#     async def get_google_user_info(self, credentials: Credentials) -> dict:
#         """Get user info from Google"""
#         try:
#             service = build('oauth2', 'v2', credentials=credentials)
#             user_info = service.userinfo().get().execute()
#             return user_info

#         except Exception as e:
#             raise Exception(f"Error getting user info from Google: {str(e)}")

#     async def get_user_preferences(self, user_id: str) -> schemas.UserPreferences:
#         """Get user preferences"""
#         # This should be implemented to fetch from your database
#         # For now, return default preferences
#         return schemas.UserPreferences()

#     async def update_user_preferences(
#         self,
#         user_id: str,
#         preferences: schemas.UserPreferences
#     ) -> None:
#         """Update user preferences"""
#         # This should be implemented to update your database
#         raise NotImplementedError("This method needs to be implemented")

#     async def upsert_user(
#         self,
#         user_info: dict,
#         credentials: Credentials
#     ) -> schemas.User:
#         """Create or update user in database"""
#         # This should be implemented to update your database
#         # For now, return a dummy user
#         return schemas.User(
#             id=user_info['id'],
#             email=user_info['email'],
#             full_name=user_info['name']
#         )

#     async def get_user_by_id(self, user_id: str) -> Optional[schemas.User]:
#         """Get user from database by ID"""
#         # This should be implemented to fetch from your database
#         raise NotImplementedError("This method needs to be implemented")

# auth_service = AuthService()
