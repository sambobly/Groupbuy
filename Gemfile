source 'http://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails'

# Use mysql as the database for Active Record
group :test, :production do
  gem 'pg'
  gem 'rails_12factor'
end
group :development do
  gem 'mysql2', '0.3.16'
end
# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'client_side_validations', git: "https://github.com/amitree/client_side_validations.git", branch: "4-0-beta"
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'
gem 'ransack'
# gem 'dashing-rails', git: "https://github.com/tdenovan/dashing-rails.git"
#gem 'puma', '= 2.8.2'
gem 'rack-cors', :require => 'rack/cors'
gem "koala", '~> 2.0'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  # gem 'sdoc', require: false
  gem 'yard', require: false # Using Yard instead of sdoc
end

group :development do
  gem 'debugger'

  gem 'ffaker' # Gem for generating fake data, see lib/tasks/populate

end

group :test do
  gem 'debugger'
end

gem 'appointments', "~> 1.3.3" # THEO: Do we need this Gem?
gem 'protected_attributes'


# Use ActiveModel has_secure_password
gem 'bcrypt-ruby', '~> 3.1.2'

gem 'tzinfo-data'
gem 'devise'
gem 'activeadmin', github: 'gregbell/active_admin'
gem 'bootstrap-sass'
gem "bower-rails", "~> 0.9.1"
gem 'rangy-rails'
# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]
