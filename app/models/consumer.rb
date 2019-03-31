class Consumer < ActiveRecord::Base
  validates :name, :first_name, :last_name, :date_of_birth, :email, presence: true
  attr_accessible :name, :first_name, :last_name, :date_of_birth, :payment_method_id, :public, :gender, :pronoun, :email, :number, :password, :user_id, :avatar, :winner

  belongs_to :payment_method
  belongs_to :user
  has_many :merchandises
  has_many :bids
  has_many :claims

  has_many :tickets
  has_many :wishes

  accepts_nested_attributes_for :bids
  accepts_nested_attributes_for :claims

  accepts_nested_attributes_for :merchandises
  accepts_nested_attributes_for :tickets
  accepts_nested_attributes_for :wishes
  mount_uploader :avatar, AvatarUploader

  def assign_customer_id
    customer = Stripe::Customer.create(email: email)
    self.customer_id = customer.id
  end

end
