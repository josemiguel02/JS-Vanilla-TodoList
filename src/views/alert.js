export class Alert {
  constructor(selector) {
    this.alert = $(selector)
  }

  show(message) {
    this.alert.html(message)
    this.alert.toggleClass('d-none')
    setTimeout(() => this.hide(), 3000)
  }

  hide() {
    this.alert.toggleClass('d-none')
  }
}
