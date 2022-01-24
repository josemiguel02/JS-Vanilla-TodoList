import { $ } from '../utils/dom.js'

export class View {
  constructor() {
    this.model = null
  }

  init() {
    this.render()
    // After loading the DOM elements
    this.model.init()

    if (!this.model.getTodos().length) {
      $('#table > tbody').innerHTML = `
        <tr>
          <td colspan="4" class="text-center">
            You don't have any pending tasks 👻
          </td>
        </tr>
      `
    }
  }

  setModel(model) {
    this.model = model
  }

  render() {
    const todos = this.model.getTodos()
    const html = todos.map(todo => {
      const { id, title, description, completed } = todo
      return `
        <tr>
          <td>
            <div class="d-flex justify-content-center">
              ${title}
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-center">
              ${description}
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-center">
              <input type="checkbox" id="completed" ${completed ? 'checked' : ''} data-id="${id}" />
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-info btn-sm" id="edit" data-toggle="modal" data-target="#modal" data-id="${id}">
                <i class="fa fa-pencil"></i>
              </button>
              <button type="button" class="btn btn-danger btn-sm ml-2" id="delete" data-id="${id}">
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>`
    }).join('')

    $('#table > tbody').innerHTML = html
  }
}
