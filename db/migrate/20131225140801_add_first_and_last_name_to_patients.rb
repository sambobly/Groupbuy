class AddFirstAndLastNameToPatients < ActiveRecord::Migration
  def change
    add_column :patients, :first_name, :string
    add_column :patients, :last_name, :string
    remove_column :patients, :name
  end
end
