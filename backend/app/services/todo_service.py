from typing import List
from fastapi import HTTPException
from app.repositories.todo_repository import TodoRepository
from app.schemas.todo import TodoCreate, TodoRead, TodoUpdate
from app.models.todo import Todo

class TodoService:
    def __init__(self, repository: TodoRepository):
        self.repository = repository

    def create_todo(self, todo_create: TodoCreate) -> Todo:
        return self.repository.create(todo_create)

    def get_todos(self, offset: int, limit: int) -> List[Todo]:
        return self.repository.get_all(offset, limit)

    def get_todo(self, todo_id: int) -> Todo:
        todo = self.repository.get_by_id(todo_id)
        if not todo:
            raise HTTPException(status_code=404, detail="ToDo not found")
        return todo

    def update_todo(self, todo_id: int, todo_update: TodoUpdate) -> Todo:
        db_todo = self.get_todo(todo_id) # Reuse get_todo to handle 404
        return self.repository.update(db_todo, todo_update)

    def delete_todo(self, todo_id: int) -> None:
        db_todo = self.get_todo(todo_id)
        self.repository.delete(db_todo)
