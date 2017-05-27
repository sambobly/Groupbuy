class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  #include Rails.application.routes.url_helpers
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :authentication_keys => [:email]

  #NOTE CAN ADD :validatable, TO DEVISE HELPERS
  #attr_accessor :name, :password_digest, :email, :password, :id, :current_password, :password_confirmation
  attr_accessible :name, :password_digest, :email, :password, :id, :current_password
  has_many :consumers
  accepts_nested_attributes_for :consumers



end
private
