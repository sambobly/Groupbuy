require File.expand_path('../boot', __FILE__)

require 'rails/all'


# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module Optho
  class Application < Rails::Application

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
    
    # Bower (js package manager) configuration
    config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')
    config.middleware.insert_before ActionDispatch::Static, Rack::Cors do
      allow do
        origins '*'
        resource '*', :headers => :any, :methods => [:get, :post, :options]
      end
    end

    config.action_dispatch.default_headers = {
        'X-Frame-Options' => 'ALLOWALL'
        #'Access-Control-Allow-Origin' => 'http://localhost:3000',
        #'Access-Control-Request-Method' => %w{GET POST OPTIONS}.join(",")
    }
    config.to_prepare do
      DeviseController.respond_to :html, :json
    end
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
    #config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
    #config.action_mailer.delivery_method = :smtp
    #config.action_mailer.perform_deliveries = true
    #config.action_mailer.smtp_settings = {
    #    :authentication => :login,
    #    :address => "smtp.gmail.com",
    #    :port => 587,
    #    :domain => "gmail.com",
    #    :user_name => "regreginald32@gmail.com",
    #    :password => "Reginald1",
    #    :enable_starttls_auto => true
    #
    #}
  end

end
