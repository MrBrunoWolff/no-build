source "https://rubygems.org"

ruby "3.4.2"

# Rails itself
gem "rails", "~> 8.0.2"

# Import Maps for JavaScript without build steps
gem "importmap-rails", "~> 2.1.0"

# Use propshaft for asset pipeline
gem "propshaft", "~> 1.1.0"

# Use Hotwire to send HTML over the wire
gem "turbo-rails", "~> 2.0.13"
gem "stimulus-rails", "~> 1.3.4"

# Use Puma as the app server
gem "puma", "~> 6.6.0"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ]
end

group :development do
  # Use console to access IRB console on exceptions page
  gem "web-console"
end

group :test do
  # Use system testing
  gem "capybara"
  gem "selenium-webdriver"
end 