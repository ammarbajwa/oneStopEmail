from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime
from .models import schemas
from .services import email_service, ai_service
from .core.config import settings

app = FastAPI(title="AI Email Agent API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test endpoint
@app.get("/api/test")
async def test_endpoint():
    """Test endpoint to verify the API is running"""
    return {
        "status": "success",
        "message": "AI Email Agent API is running",
        "timestamp": datetime.now().isoformat()
    }

# # Auth endpoints
# @app.post("/api/auth/google", response_model=schemas.Token)
# async def google_oauth(code: str):
#     """Handle Google OAuth authentication"""
#     return await auth_service.authenticate_google(code)

# Email endpoints
@app.get("/api/emails/category/{category}", response_model=List[schemas.Email])
async def get_emails(
    category: str,
    page: int = 1,
    limit: int = 20,
    current_user: schemas.User = schemas.User(id="1", email="abajwa.linkedin@gmail.com", full_name="ammar" )
):
    """Get emails for a specific category"""
    try:
        print(f"Handling request for category: {category}, page: {page}, limit: {limit}")
        emails = await email_service.get_emails_by_category(
            user_id=current_user.id,
            category=category,
            page=page,
            limit=limit
        )
        if not emails and isinstance(emails, list):
            print("No emails found for category")
            return []
        return emails
    except Exception as e:
        print(f"Error in get_emails endpoint: {str(e)}")
        import traceback
        print(f"Full traceback: {traceback.format_exc()}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@app.get("/api/emails/detail/{email_id}", response_model=schemas.EmailDetail)
async def get_email_detail(
    email_id: str,
    current_user: schemas.User = schemas.User(id="1", email="abajwa.linkedin@gmail.com", full_name="ammar" )
):
    """Get detailed information for a specific email"""
    try:
        email = await email_service.get_email_by_id(
            user_id=current_user.id,
            email_id=email_id
        )
        return email
    except Exception as e:
        raise HTTPException(status_code=404, detail="Email not found")

@app.post("/api/emails/{email_id}/categorize")
async def categorize_email(
    email_id: str,
    category: schemas.CategoryUpdate,
    current_user: schemas.User = schemas.User(id="1", email="abajwa.linkedin@gmail.com", full_name="ammar" )
):
    """Update email category"""
    try:
        await email_service.update_email_category(
            user_id=current_user.id,
            email_id=email_id,
            category=category.category
        )
        return {"message": "Category updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# AI Response endpoints
@app.post("/api/emails/{email_id}/generate-response", response_model=schemas.AIResponse)
async def generate_response(
    email_id: str,
    current_user: schemas.User = schemas.User(id="1", email="abajwa.linkedin@gmail.com", full_name="ammar" )
):
    """Generate AI response for an email"""
    try:
        email = await email_service.get_email_by_id(
            user_id=current_user.id,
            email_id=email_id
        )
        response = await ai_service.generate_response(email)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/emails/{email_id}/send-response")
async def send_response(
    email_id: str,
    response: schemas.EmailResponse,
    current_user: schemas.User = schemas.User(id="1", email="abajwa.linkedin@gmail.com", full_name="ammar" )
):
    """Send response to an email"""
    try:
        await email_service.send_email_response(
            user_id=current_user.id,
            email_id=email_id,
            response_text=response.content
        )
        return {"message": "Response sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# User preference endpoints
@app.get("/api/user/preferences", response_model=schemas.UserPreferences)
async def get_preferences(current_user: schemas.User = schemas.User(id="1", email="abajwa.linkedin@gmail.com", full_name="ammar" )):
    """Get user preferences"""
    # return await auth_service.get_user_preferences(current_user.id)
    return schemas.UserPreferences()

@app.put("/api/user/preferences")
async def update_preferences(
    preferences: schemas.UserPreferences,
    current_user: schemas.User = schemas.User(id="1", email="abajwa.linkedin@gmail.com", full_name="ammar" )
):
    """Update user preferences"""
    try:
        # await auth_service.update_user_preferences(current_user.id, preferences)
        return {"message": "Preferences updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
