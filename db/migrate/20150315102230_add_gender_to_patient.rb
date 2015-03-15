class AddGenderToPatient < ActiveRecord::Migration
  def change
    add_column :patients, :gender, :text
  end
end
