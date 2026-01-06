"""
Session management for maintaining conversation context.
Uses in-memory storage with automatic cleanup of expired sessions.
"""

from typing import Dict, List
from datetime import datetime, timedelta
from threading import Lock
import uuid


class Message:
    """Represents a single message in the conversation."""
    
    def __init__(self, role: str, content: str):
        self.role = role  # 'user' or 'assistant'
        self.content = content
        self.timestamp = datetime.now()


class Session:
    """Represents a conversation session with message history."""
    
    def __init__(self, session_id: str, timeout_minutes: int = 30):
        self.session_id = session_id
        self.messages: List[Message] = []
        self.created_at = datetime.now()
        self.last_accessed = datetime.now()
        self.timeout_minutes = timeout_minutes
    
    def add_message(self, role: str, content: str):
        """Add a message to the session history."""
        self.messages.append(Message(role, content))
        self.last_accessed = datetime.now()
    
    def get_messages(self) -> List[Dict[str, str]]:
        """Get all messages in the format expected by Ollama."""
        self.last_accessed = datetime.now()
        return [{"role": msg.role, "content": msg.content} for msg in self.messages]
    
    def is_expired(self) -> bool:
        """Check if the session has expired."""
        timeout = timedelta(minutes=self.timeout_minutes)
        return datetime.now() - self.last_accessed > timeout


class SessionManager:
    """
    Manages conversation sessions with automatic cleanup.
    Thread-safe implementation for concurrent access.
    """
    
    def __init__(self, timeout_minutes: int = 30):
        self.sessions: Dict[str, Session] = {}
        self.timeout_minutes = timeout_minutes
        self.lock = Lock()
    
    def create_session(self, session_id: str = None) -> str:
        """
        Create a new session or return existing one.
        
        Args:
            session_id: Optional session ID. If not provided, generates a new UUID.
            
        Returns:
            The session ID (existing or newly created).
        """
        if session_id is None:
            session_id = str(uuid.uuid4())
        
        with self.lock:
            if session_id not in self.sessions:
                self.sessions[session_id] = Session(session_id, self.timeout_minutes)
            return session_id
    
    def get_session(self, session_id: str) -> Session:
        """
        Get an existing session.
        
        Args:
            session_id: The session ID to retrieve.
            
        Returns:
            The Session object.
            
        Raises:
            ValueError: If session doesn't exist.
        """
        with self.lock:
            if session_id not in self.sessions:
                raise ValueError(f"Session {session_id} not found")
            return self.sessions[session_id]
    
    def add_message(self, session_id: str, role: str, content: str):
        """
        Add a message to a session.
        
        Args:
            session_id: The session ID.
            role: Message role ('user' or 'assistant').
            content: Message content.
        """
        session = self.get_session(session_id)
        session.add_message(role, content)
    
    def get_conversation_history(self, session_id: str) -> List[Dict[str, str]]:
        """
        Get the conversation history for a session.
        
        Args:
            session_id: The session ID.
            
        Returns:
            List of messages in {'role': str, 'content': str} format.
        """
        session = self.get_session(session_id)
        return session.get_messages()
    
    def cleanup_expired_sessions(self):
        """Remove expired sessions to free up memory."""
        with self.lock:
            expired = [
                sid for sid, session in self.sessions.items() 
                if session.is_expired()
            ]
            for sid in expired:
                del self.sessions[sid]
            
            if expired:
                print(f"Cleaned up {len(expired)} expired sessions")
    
    def get_active_session_count(self) -> int:
        """Get the number of active sessions."""
        with self.lock:
            return len(self.sessions)


# Global session manager instance
session_manager = SessionManager()
