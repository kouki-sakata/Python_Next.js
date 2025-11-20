from typing import List
from fastapi import APIRouter, Depends, Query
from sqlmodel import Session

from app.database import get_session
from app.schemas.todo import TodoCreate, TodoRead, TodoUpdate
from app.repositories.todo_repository import TodoRepository
from app.services.todo_service import TodoService

router = APIRouter()

def get_todo_service(session: Session = Depends(get_session)) -> TodoService:
    repository = TodoRepository(session)
    return TodoService(repository)

@router.post("/", response_model=TodoRead)
def create_todo(
    todo: TodoCreate,
    service: TodoService = Depends(get_todo_service)
):
    return service.create_todo(todo)

@router.get("/", response_model=List[TodoRead])
def read_todos(
    offset: int = 0,
    limit: int = Query(default=100, le=100),
    service: TodoService = Depends(get_todo_service)
):
    return service.get_todos(offset, limit)

@router.get("/{todo_id}", response_model=TodoRead)
def read_todo(
    todo_id: int,
    service: TodoService = Depends(get_todo_service)
):
    return service.get_todo(todo_id)

@router.patch("/{todo_id}", response_model=TodoRead)
def update_todo(
    todo_id: int,
    todo: TodoUpdate,
    service: TodoService = Depends(get_todo_service)
):
    return service.update_todo(todo_id, todo)

@router.delete("/{todo_id}")
def delete_todo(
    todo_id: int,
    service: TodoService = Depends(get_todo_service)
):
    service.delete_todo(todo_id)
    return {"ok": True}
