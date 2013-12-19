class AddLastnameToDoctors < ActiveRecord::Migration
  def change
    add_column :doctors, :lastname, :string
  end
end
