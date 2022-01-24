import { Todo } from './models/todo.js'
import { View } from './views/index.js'

const Main = () => {
  const model = new Todo()
  const view = new View()
  model.setView(view)
  view.setModel(model)
  view.init()
}

document.addEventListener('DOMContentLoaded', Main)
