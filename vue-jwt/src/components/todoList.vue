<template>
  <div>
    <h2>Todos</h2>
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
    </ul>
    <input type="text" v-model="newTodoText">
    <button @click="addTodo">Add Todo</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { initDB, getDB } from '../db/testDb';

let todos = ref([]);
let newTodoText = ref('');

const addTodo = async () => {
  if (!newTodoText.value.trim()) return;

  const db = getDB();
  const tx = db.transaction('todos', 'readwrite');
  const store = tx.objectStore('todos');
  const newTodo = { text: newTodoText.value };
  const id = await store.add(newTodo);
  await tx.done;

  if(todos.value && todos.value.length) {
    todos.value = [...todos.value, {id, ...newTodo}];
  }
  else {
    todos.value = [{id, ...newTodo}]
  }
  newTodoText.value = '';
  console.log(todos.value)
};



onMounted(async () => {
  await initDB();
  const db = getDB();
  const tx = db.transaction('todos', 'readonly');
  const store = tx.objectStore('todos');
  const allTodos = await store.getAll();
  todos.value = allTodos;
});

</script>

<style>
/* Styles for your component */
</style>
