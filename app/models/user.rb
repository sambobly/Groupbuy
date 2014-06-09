class User < ActiveRecord::Base
  attr_destroy :ensure_an_admin_remains
  attr_accessible :name, :password, :password_confirmation
  validates :name, presence: true, uniqueness: true
  has_secure_password
end
private
def ensure_an_admin_remains
  if User.count.zero?
    raise "Can't Delete Last User"
  end
end