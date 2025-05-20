import { Controller } from "@hotwired/stimulus"

// A simple Stimulus controller that shows how to work with actions and targets
export default class extends Controller {
  // Define targets from HTML elements with data-hello-target="output"
  static targets = ["output"]
  
  // This function is automatically called when controller connects to the DOM
  connect() {
    console.log("Hello controller connected")
  }
  
  // This action can be triggered with data-action="hello#greet"
  greet() {
    this.outputTarget.textContent = "Hello from No-Build Rails!"
  }
  
  // This action shows how to handle parameters
  // Use with data-action="hello#sayHello" data-hello-name-param="Your Name"
  sayHello(event) {
    const name = this.nameParam || "World"
    this.outputTarget.textContent = `Hello, ${name}!`
  }
  
  // Define parameter getters as needed
  get nameParam() {
    return this.element.dataset.helloNameParam
  }
} 