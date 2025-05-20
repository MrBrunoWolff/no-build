require_relative "boot"
require "rails"
# Only include the frameworks we're using
# For a frontend-focused no-build approach, we can make ActiveRecord optional
%w(
  action_controller
  action_view
  action_mailer
  active_job
  active_support
  rails/test_unit
  sprockets
).each do |framework|
  begin
    require "#{framework}/railtie"
  rescue LoadError
  end
end

# Explicitly require importmap-rails
require "importmap-rails"

# Explicitly require propshaft
require "propshaft"

module NoBuild
  class Application < Rails::Application
    config.load_defaults 8.0
    
    # For frontend-only applications, we can skip Active Record
    config.active_record.migration_error = false if defined?(config.active_record)
    
    # Configure static file serving for development
    config.public_file_server.enabled = true
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{1.hour.to_i}"
    }
    
    # Ensure JavaScript assets are found
    config.paths.add "app/javascript", glob: "**/*"
    
    # Configure Propshaft asset compiler in production
    if Rails.env.production?
      config.assets.compile = false
      config.assets.digests = true
    end
  end
end 