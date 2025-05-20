# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/custom", under: "custom"

# External libraries - uncomment as needed
# pin "lodash-es", to: "https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/+esm"
# pin "chart.js", to: "https://cdn.jsdelivr.net/npm/chart.js@4.3.0/+esm"
# pin "alpine", to: "https://cdn.jsdelivr.net/npm/alpinejs@3.12.2/+esm" 