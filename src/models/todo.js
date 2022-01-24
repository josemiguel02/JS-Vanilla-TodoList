import { $$ } from '../utils/dom.js'
import { Alert } from '../views/alert.js'

export class Todo {
  constructor() {
    this.view = null
    this.todos = this.loadTodos()
  }

  init() {
    this.addTodo()
    this.editTodo()
    this.deleteTodo()
    this.toggleTodo()
  }

  setView(view) {
    this.view = view
  }

  getTodos() {
    return this.todos.map(todo => ({ ...todo }))
  }

  loadTodos() {
    return localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : [
          {
            id: 1,
            title: 'Learn NodeJS 💎',
            description: 'With Express and MongoDB',
            completed: false
          }
        ]
  }

  findTodoById(id) {
    return this.todos.findIndex(todo => todo.id === id)
  }

  saveTodo() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  addTodo() {
    $('#form').submit(e => {
      e.preventDefault()
      const title = $('#title').val()
      const description = $('#description').val()

      if (title !== '' && description !== '') {
        const todo = {
          id: this.todos.length + 1,
          title,
          description,
          completed: false
        }

        this.todos.push(todo)
        $('#form').trigger('reset')
        this.view.init()
        this.saveTodo()
        return
      }

      const alert = new Alert('#form-alert')
      alert.show('Title and description are required!')
    })
  }

  editTodo() {
    $$('#edit').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id')
        const index = this.findTodoById(parseInt(id))
        const { title, description, completed } = this.todos[index]

        $('#modal-title').val(title)
        $('#modal-description').val(description)
        $('#modal-completed').prop('checked', completed)
        $('#modal-btn').attr('data-id', id)
      }
    })

    $('#modal-btn').click(() => {
      const id = $('#modal-btn').attr('data-id')
      const title = $('#modal-title').val()
      const description = $('#modal-description').val()

      if (title === '' || description === '') {
        const alert = new Alert('#modal-alert')
        alert.show('Title and description are required!')
        return
      }

      const todo = {
        id: parseInt(id),
        title,
        description,
        completed: $('#modal-completed').prop('checked')
      }

      const index = this.findTodoById(parseInt(id))
      this.todos.splice(index, 1, todo)
      this.view.init()
      this.saveTodo()
      $('#modal').modal('toggle')
    })
  }

  deleteTodo() {
    $$('#delete').forEach(btn => {
      const id = btn.getAttribute('data-id')
      btn.onclick = () => {
        this.todos = this.todos.filter(item => item.id !== parseInt(id))
        this.view.init()
        this.saveTodo()
      }
    })
  }

  toggleTodo() {
    $$('#completed').forEach(check => {
      check.onclick = () => {
        const id = check.getAttribute('data-id')
        const index = this.findTodoById(parseInt(id))
        const { completed } = this.todos[index]
        this.todos[index].completed = !completed
        this.view.init()
        this.saveTodo()
      }
    })
  }
}
