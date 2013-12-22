class RenameNameColumnToFirstname < ActiveRecord::Migration
  def self.up
    rename_column :doctors, :name, :first_name
  end

  def self.down
    rename_column :doctors, :first_name, :name
  end
end
