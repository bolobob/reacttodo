import Dexie from 'dexie';

const db = new Dexie('todo_db');
db.version(1).stores({
  todos: '++id,completed,content,created_at,updated_at'
});

export default db;
