Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Set the root path
  root "welcome#index"
  
  # Add a simple about page
  get "/about", to: "welcome#about"
  
  # Add a simple contact page
  get "/contact", to: "welcome#contact"

  get "/turbo_demo", to: "welcome#turbo_demo"
  
  # Serve JavaScript files directly from public/assets
  get "/assets/*path", to: "public#index", constraints: ->(req) { req.path.start_with?("/assets/") }
end 