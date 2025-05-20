Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # In the development environment your application's code is reloaded any time
  # it changes. This slows down response time but is perfect for development
  config.enable_reloading = true

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable server timing
  config.server_timing = true

  # Enable/disable caching. By default caching is disabled.
  config.action_controller.perform_caching = false
  config.cache_store = :null_store

  # Store uploaded files on the local file system
  config.active_storage.service = :local if defined?(config.active_storage)

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Suppress logger output for asset requests.
  config.assets.quiet = true if defined?(config.assets)

  # Allow web console access from all IPs in development
  config.web_console.permissions = '0.0.0.0/0' if defined?(config.web_console)
end 