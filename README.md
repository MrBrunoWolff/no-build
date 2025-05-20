# No-Build Rails

A lightweight and modern starter template for Rails 8 web apps following the "No Build" philosophy.

## ✨ Features

* ⚡️ No build steps - infinitely fast development
* 📦 Minimal dependencies
* 🔵 Vanilla ES6 with Import Maps
* 🎨 Vanilla CSS with nesting and variables
* 🧩 Simple and clean project structure
* 🚀 Compatible with Rails 8's built-in asset pipeline
* 💫 Turbo and Stimulus for SPA-like experiences

## 🚦 Getting Started

### Quick Start (Recommended)

Create a new project with a single command using npx or bunx:

```bash
# Using npm
npx no-build my-app

# Using bun
bunx no-build my-app
```

The interactive CLI will:
1. Create a new project directory
2. Copy all template files
3. Provide next steps for setup

### Manual Installation

```bash
# Clone this repository
git clone https://github.com/MrBrunoWolff/no-build.git my-rails-app
cd my-rails-app

# Remove the .git directory
rm -rf .git

# Initialize a new git repository
git init
git add .
git commit -m "Initial commit"

# Bundle install
bundle install

# Start the server
bin/rails server
```

Your app will be available at `http://localhost:3000` with Turbo and Stimulus-powered interactions.

### Database Configuration

The template includes a basic `database.yml` configured to use SQLite. For a real application, you may want to customize it based on your requirements. The default configuration:

- Uses in-memory SQLite for development and test environments
- Includes commented examples for file-based databases
- Suggests environment variables for production credentials

## 📁 Project Structure

```
app/
├── assets/
│   ├── config/
│   │   └── manifest.js        # Asset manifest
│   ├── stylesheets/           # CSS files
│   │   └── application.css    # Main CSS file with nesting and variables
├── javascript/                # JavaScript files
│   ├── application.js         # Entry point for JavaScript
│   ├── controllers/           # Stimulus controllers
│   │   └── hello_controller.js # Example Stimulus controller
│   └── custom/                # Custom JavaScript utilities
│       └── utils.js           # Example utility functions
├── views/
│   ├── layouts/
│   │   └── application.html.erb  # Main layout with Import Maps
│   └── welcome/
│       ├── index.html.erb     # Main welcome page with examples
│       └── _turbo_demo.html.erb # Turbo Frame example
├── controllers/
│   ├── welcome_controller.rb  # Main controller
│   └── public_controller.rb   # Handles static assets
config/
├── importmap.rb               # Import Maps configuration
├── routes.rb                  # Application routes
└── application.rb             # Application configuration
```

## 💡 Philosophy

This template follows DHH's "No Build" philosophy as described in his [article](https://world.hey.com/dhh/you-can-t-get-faster-than-no-build-7a44131c). The key principles are:

1. **No build steps** - Skip bundling, transpilation, and other build processes
2. **Import Maps** - Use HTTP/2 and import maps to manage JavaScript dependencies
3. **Vanilla CSS** - Use modern CSS features like nesting and variables
4. **Rails 8 Asset Pipeline** - Simplified asset delivery with Propshaft
5. **Hotwire** - Modern, HTML-over-the-wire approach to building web applications

As DHH points out:

> The state of the art is no longer finding more sophisticated ways to build JavaScript or CSS. It's not to build at all. To lean on HTTP/2 and the now universal support for import maps to avoid bundling, and to lean on the fundamental progress in support for modern JavaScript and CSS to avoid compiling what browsers already know how to read.

## 🔧 Modern Web Techniques

### Asset Handling in Rails 8

This template properly configures Rails 8's asset system to work with JavaScript files:

1. **JavaScript in app/javascript**: All JS files are stored in `app/javascript` directory
2. **Public assets serving**: Assets are served via the `public_controller.rb`
3. **JSS controller organization**: Controllers are kept in `app/javascript/controllers`
4. **Custom utilities**: Non-controller JavaScript is stored in `app/javascript/custom`

The configuration ensures that JavaScript files load properly without any build steps:

```ruby
# In config/application.rb
config.paths.add "app/javascript", glob: "**/*"
config.public_file_server.enabled = true
```

### Propshaft Asset Pipeline

This template uses Propshaft (the modern Rails asset pipeline) for serving assets:

```ruby
# In Gemfile
gem "propshaft", "~> 1.1.0"
```

The manifest file (app/assets/config/manifest.js) is configured to include JavaScript assets:

```javascript
//= link_tree ../stylesheets .css
//= link_tree ../../javascript .js
```

In Rails 8, Propshaft works out of the box with minimal configuration. The PublicController provides a fallback for serving JavaScript files during development.

### Import Maps

This template uses Import Maps to manage JavaScript dependencies without bundling:

```erb
<%= javascript_importmap_tags %>
```

Define your imports in `config/importmap.rb`:

```ruby
pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
```

### Turbo Frames Example

The template includes a working example of Turbo Frames. When you visit the main page and click "Load Content", the frame updates without a full page reload.

The implementation includes:
```erb
<!-- In index.html.erb -->
<turbo-frame id="demo-frame">
  <div class="card mt-md">
    <h2 class="card-title">Turbo Frame Example</h2>
    <div class="card-body">
      <%= link_to "Load Content", turbo_demo_path, data: { turbo_frame: "demo-frame" } %>
    </div>
  </div>
</turbo-frame>

<!-- In _turbo_demo.html.erb -->
<turbo-frame id="demo-frame">
  <div class="card mt-md">
    <h2 class="card-title">Turbo Frame Example (Loaded!)</h2>
    <!-- Content after clicking -->
  </div>
</turbo-frame>
```

### Modern CSS

Use native CSS nesting and variables:

```css
:root {
  --primary-color: #4a154b;
  --secondary-color: #36c5f0;
}

.button {
  background-color: var(--primary-color);
  
  &:hover {
    background-color: var(--secondary-color);
  }
}
```

## 🚀 Using npm Packages with Import Maps

Even though we're using a no-build approach, you can still use npm packages via CDN with import maps:

### Direct CDN Pinning

```ruby
# In config/importmap.rb
# Pin a package directly from a CDN
pin "lodash-es", to: "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm"
pin "chart.js", to: "https://cdn.jsdelivr.net/npm/chart.js@4.3.0/+esm"
```

### Using Pinned Packages

Then import it in your JavaScript:

```javascript
// In your JavaScript file
import { debounce } from "lodash-es"

// Use the imported functions
const debouncedFunction = debounce(() => {
  console.log("Debounced!")
}, 300)
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.