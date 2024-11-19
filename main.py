# main.py
from fastapi import FastAPI, Query
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend URL for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["bookstore"]
collection = db["books"]

class Book(BaseModel):
    title: str
    description: str
    cover: str

@app.get("/books", response_model=List[Book])
async def get_books(page: int = 1, limit: int = 10):
    skip = (page - 1) * limit
    books_cursor = collection.find().skip(skip).limit(limit)
    books = await books_cursor.to_list(length=limit)
    return books

@app.post("/books")
async def create_book(book: Book):
    await collection.insert_one(book.dict())
    return {"message": "Book created successfully"}
