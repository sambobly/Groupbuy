class AddAvatarToConsumers < ActiveRecord::Migration
  def change
    add_column :consumers, :avatar, :string
  end
end
