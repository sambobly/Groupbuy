class CreateTests < ActiveRecord::Migration
  def change
    create_table :tests do |t|
      t.string :name
      t.string :concession_type

      t.timestamps
    end
  end
end
