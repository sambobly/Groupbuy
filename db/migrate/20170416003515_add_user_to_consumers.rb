class AddUserToConsumers < ActiveRecord::Migration
  def change
    add_reference :consumers, :user, index: true
  end
end
