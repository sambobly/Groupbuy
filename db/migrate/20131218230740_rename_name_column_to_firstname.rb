class RenameNameColumnToFirstname < ActiveRecord::Migration
  def self.up
    rename_column :doctors, :name, :Firstname
  end

  def self.down
    rename_column :doctors, :Firstname, :name
  end
end
