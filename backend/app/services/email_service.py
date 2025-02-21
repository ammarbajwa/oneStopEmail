from typing import List, Optional
from ..models import schemas
from ..core.config import settings
from datetime import datetime

class EmailService:
    def __init__(self):
        self.categories = {
            "work": ["@company.com", "project", "meeting", "report"],
            "personal": ["family", "friend", "vacation", "personal"],
            "newsletters": ["newsletter", "subscription", "update", "digest"],
            "urgent": ["urgent", "asap", "immediate", "deadline"]
        }
        # Test data
        self.test_emails = [
            {
                "id": "1",
                "subject": "Project Update Meeting",
                "sender": "john@company.com",
                "preview": "Let's discuss the latest project updates...",
                "date": datetime.now().isoformat(),
                "category": "work",
                "isRead": False,
                "body": "Hi team,\n\nLet's discuss the latest project updates in our meeting tomorrow. I've prepared the agenda and will share it shortly.\n\nBest regards,\nJohn"
            },
            {
                "id": "2",
                "subject": "Family Vacation Plans",
                "sender": "sarah@gmail.com",
                "preview": "About our upcoming family vacation...",
                "date": datetime.now().isoformat(),
                "category": "personal",
                "isRead": True,
                "body": "Hey!\n\nJust wanted to discuss our upcoming family vacation plans. I've found some great destinations we could consider.\n\nLet me know your thoughts!\nSarah"
            },
            {
                "id": "3",
                "subject": "Weekly Newsletter",
                "sender": "newsletter@tech.com",
                "preview": "Your weekly tech digest is here...",
                "date": datetime.now().isoformat(),
                "category": "newsletters",
                "isRead": False,
                "body": "Your Weekly Tech Digest\n\nHere are the top tech stories of the week:\n- AI advances in email management\n- New programming languages on the rise\n- Cloud computing trends"
            }
        ]

    async def get_emails_by_category(
        self,
        user_id: str,
        category: str,
        page: int = 1,
        limit: int = 20
    ) -> List[schemas.Email]:
        """Get emails for a specific category"""
        try:
            print(f"Getting emails for category: {category}, page: {page}, limit: {limit}")
            
            # Filter emails by category
            filtered_emails = [
                email for email in self.test_emails
                if category == "inbox" or email["category"] == category
            ]
            print(f"Found {len(filtered_emails)} emails after filtering")
            print(f"Filtered emails: {filtered_emails}")
            
            # Apply pagination
            start = (page - 1) * limit
            end = start + limit
            paginated_emails = filtered_emails[start:end]
            print(f"Paginated emails (start: {start}, end: {end}): {paginated_emails}")
            
            # Convert to schema
            result_emails = []
            for email in paginated_emails:
                try:
                    # Remove body field since it's not in Email schema
                    email_data = email.copy()
                    if 'body' in email_data:
                        del email_data['body']
                    email_obj = schemas.Email(**email_data)
                    result_emails.append(email_obj)
                except Exception as e:
                    print(f"Error converting email to schema: {str(e)}")
                    print(f"Email data causing error: {email_data}")
                    raise  # Re-raise to see the full error
            
            print(f"Successfully converted {len(result_emails)} emails to schema")
            return result_emails
        except Exception as e:
            print(f"Error in get_emails_by_category: {str(e)}")
            import traceback
            print(f"Full traceback: {traceback.format_exc()}")
            raise  # Re-raise to see the full error

    async def get_email_by_id(
        self,
        user_id: str,
        email_id: str
    ) -> Optional[schemas.EmailDetail]:
        """Get detailed information for a specific email"""
        try:
            # Find email by id
            email = next(
                (email for email in self.test_emails if email["id"] == email_id),
                None
            )
            if email:
                return schemas.EmailDetail(**email)
            return None
        except Exception as e:
            print(f"Error getting email details: {str(e)}")
            return None

    async def update_email_category(
        self,
        user_id: str,
        email_id: str,
        category: str
    ) -> bool:
        """Update email category"""
        try:
            # Find and update email category
            email = next(
                (email for email in self.test_emails if email["id"] == email_id),
                None
            )
            if email:
                email["category"] = category
                return True
            return False
        except Exception as e:
            print(f"Error updating email category: {str(e)}")
            return False

    async def send_email_response(
        self,
        user_id: str,
        email_id: str,
        response_text: str
    ) -> bool:
        """Send response to an email"""
        try:
            # In test mode, just print the response
            print(f"Sending response to email {email_id}: {response_text}")
            return True
        except Exception as e:
            print(f"Error sending email response: {str(e)}")
            return False

email_service = EmailService()
