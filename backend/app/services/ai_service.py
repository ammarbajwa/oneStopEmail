from typing import Optional
from ..models import schemas
import openai
from ..core.config import settings

class AIService:
    def __init__(self):
        openai.api_key = settings.OPENAI_API_KEY
        self.response_tones = {
            "professional": """You are a professional business correspondent. 
                Generate a formal, clear, and courteous response.""",
            "friendly": """You are writing to a friend or close colleague. 
                Keep the tone warm and personable while maintaining professionalism.""",
            "urgent": """This is a time-sensitive matter. 
                Be direct and action-oriented while maintaining professionalism."""
        }

    async def generate_response(self, email: schemas.EmailDetail) -> schemas.AIResponse:
        """Generate AI response for an email"""
        try:
            # Get user preferences for response tone
            tone = await self.get_user_tone_preference(email.sender_email)
            
            # Prepare prompt
            prompt = self._create_prompt(email, tone)
            
            # Generate response using OpenAI
            response = await openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": self.response_tones[tone]},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            # Extract and process the response
            generated_text = response.choices[0].message.content
            confidence_score = self._calculate_confidence_score(response)
            
            return schemas.AIResponse(
                content=generated_text,
                tone=tone,
                confidence_score=confidence_score
            )

        except Exception as e:
            raise Exception(f"Error generating AI response: {str(e)}")

    def _create_prompt(self, email: schemas.EmailDetail, tone: str) -> str:
        """Create prompt for AI response generation"""
        return f"""
        Generate a response to the following email:

        Subject: {email.subject}
        From: {email.sender} ({email.sender_email})
        Content: {email.content}

        Please generate a {tone} response that:
        1. Addresses the main points of the email
        2. Maintains appropriate tone and formality
        3. Includes specific details from the original email
        4. Provides clear next steps or actions if needed
        """

    def _calculate_confidence_score(self, response) -> float:
        """Calculate confidence score based on OpenAI response"""
        # This is a simplified version - you might want to implement more sophisticated scoring
        return min(response.choices[0].finish_reason == "stop", 0.95)

    async def get_user_tone_preference(self, sender_email: str) -> str:
        """Get user's preferred tone for this sender"""
        # This should be implemented to fetch user preferences
        # For now, return default professional tone
        return "professional"

ai_service = AIService()
