import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import "../App.css";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchPost = async () => {
    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      console.log(todos, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchTodoById = async (id) => {
    try {
      const todoDoc = await getDoc(doc(db, "todos", id));
      if (todoDoc.exists()) {
        const todoData = todoDoc.data();
        console.log("Todo data:", todoData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching todo by ID: ", error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, { todo: updatedTodo });
      fetchPost(); // Refresh todos after update
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodos(todos.filter((todo) => todo.id !== id)); // Remove deleted todo from state
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  return (
    <section className="todo-container">
      <div className="todo">
        <h1 data-testid="cypress-title" className="header">Todo-App</h1>

        <div>
          <div>
            <input
              type="text"
              placeholder="What do you have to do today?"
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onClick={addTodo}>
              Submit
            </button>
          </div>
        </div>

        <div className="todo-content">
          {todos.map((todoItem) => (
            <div key={todoItem.id} className="todo-item">
              <input
                type="text"
                value={todoItem.todo}
                onChange={(e) => updateTodo(todoItem.id, e.target.value)}
              />
              <button onClick={() => deleteTodo(todoItem.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Todo;
