class WelcomeController < ApplicationController
  def index
    # This is just a simple view to demonstrate the no-build approach
  end

  def turbo_demo
    render partial: "turbo_demo"
  end
end 