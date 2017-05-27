class CreateEggs < ActiveRecord::Migration
  def change
    create_table :eggs do |t|
      t.string :name
      t.integer :nest_id

      t.timestamps
    end
  end
end
