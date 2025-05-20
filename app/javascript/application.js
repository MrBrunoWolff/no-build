// Entry point for the application's JavaScript
// This is using vanilla ES6 with Import Maps

// Import Turbo for SPA-like navigation
import * as Turbo from "@hotwired/turbo-rails"

// Import Stimulus for interactive components
import { Application } from "@hotwired/stimulus"
import { registerControllers } from "@hotwired/stimulus-loading"

// Initialize Stimulus
const application = Application.start()
window.Stimulus = application

// Register controllers
registerControllers(application, import.meta.glob("./controllers/*_controller.js"))

// Custom code
document.addEventListener("turbo:load", () => {
  console.log("No-Build Rails app loaded!")
})

// Example of modern ES6 features
const greet = (name) => {
  return `Hello, ${name}!`
}

// You can export functions for use in other modules
export { greet } 