source 'http://rubygems.org'
#ruby "2.3.3"
ruby "2.6.2"
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.7'
#gem 'rails', '4.1.8'
# Use mysql as the database for Active Record
group :test, :production do
  gem 'pg', '~> 0.18'
  gem 'rails_12factor'
end
group :development do
  #gem 'mysql2', '0.4.6'
  #gem 'mysql2', '0.3.16'
  #gem 'mysql2', '0.3.19'
  gem 'mysql2'

#  NOTE NEED TO CHANGE BACK TO '0.3.16' FOR 1.9.3 RUBY
end
# Use SCSS for stylesheets

#gem 'sass-rails', '~> 4.0.0'

gem 'sass-rails'

# Use Uglifier as compressor for JavaScript assets
#gem 'uglifier', '>= 1.3.0'
gem 'uglifier'


# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails'
gem 'compass'
gem 'bcrypt', platforms: :ruby
#gem 'coffee-rails', '~> 4.0.0'


# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-ui-rails', '5.0.5'
#gem 'jquery-ui-rails'
#gem 'bcrypt-ruby', '3.1.5', :require => 'bcrypt'
#gem 'bcrypt', '~> 3.1.11', platforms: [:ruby, :x64_mingw, :mingw]
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
#gem 'jbuilder', '~> 1.2'
gem 'jbuilder'

gem 'ransack'
# gem 'dashing-rails', git: "https://github.com/tdenovan/dashing-rails.git"
#gem 'puma', '= 2.8.2'
gem 'rack-cors', :require => 'rack/cors'
#gem "koala", '~> 2.0'
gem "koala"

gem "json"
gem "pry"
gem "multi_json", '= 1.7.8'
group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  # gem 'sdoc', require: false
  gem 'yard', require: false # Using Yard instead of sdoc
end

group :development do

  #gem 'debugger'  1.9.3

  # USE gem 'debugger' for RUBY 1.9.3
  gem 'ffaker' # Gem for generating fake data, see lib/tasks/populate
  gem 'awesome_print'
end

group :test do
  #gem 'byebug', github: 'deivid-rodriguez/byebug'

  #gem 'debugger'
  # USE gem 'debugger' for RUBY 1.9.3

end

gem 'appointments'# THEO: Do we need this Gem?
#gem 'appointments', "~> 1.3.3" # THEO: Do we need this Gem?

gem 'protected_attributes'
# Use ActiveModel has_secure_password
#gem 'bcrypt-ruby'
#gem 'bcrypt-ruby', '~> 3.1.2'

gem 'tzinfo-data'
gem 'devise'

gem 'angular_rails_csrf'
gem 'activeadmin', '~> 1.0.0.pre4'
gem 'bootstrap-sass'
gem "bower-rails"
gem 'carrierwave'

#gem "bower-rails", "~> 0.9.1"

gem 'rangy-rails'
gem 'omniauth'
gem  'unf_ext'
#gem  'unf_ext', '~> 0.0.7.2'

#gem 'rest-client', '~> 1.8.0'

gem 'rest-client'
gem 'stripe'
gem "mini_magick"

#gem 'stripe', '~> 1.53.0'

#gem "paperclip", "~> 5.0.0"
# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]
