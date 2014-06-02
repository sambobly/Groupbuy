class User < ActiveRecord::Base
  attr_accessible :user, :password, :password_confirmation
  validates :name, presence: true, uniqueness: true
  has_secure_password
end
