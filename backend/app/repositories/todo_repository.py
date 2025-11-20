from typing import List, Optional
from sqlmodel import Session, select
from app.models.todo import Todo
from app.schemas.todo import TodoCreate, TodoUpdate

class TodoRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, todo_create: TodoCreate) -> Todo:
        db_todo = Todo.model_validate(todo_create)
        self.session.add(db_todo)
        self.session.commit()
        self.session.refresh(db_todo)
        return db_todo

    def get_all(self, offset: int, limit: int) -> List[Todo]:
        return self.session.exec(select(Todo).offset(offset).limit(limit)).all()

    def get_by_id(self, todo_id: int) -> Optional[Todo]:
        return self.session.get(Todo, todo_id)

    def update(self, db_todo: Todo, todo_update: TodoUpdate) -> Todo:
        todo_data = todo_update.model_dump(exclude_unset=True)
        for key, value in todo_data.items():
            setattr(db_todo, key, value)
        self.session.add(db_todo)
        self.session.commit()
        self.session.refresh(db_todo)
        return db_todo

    def delete(self, db_todo: Todo) -> None:
        self.session.delete(db_todo)
        self.session.commit()
