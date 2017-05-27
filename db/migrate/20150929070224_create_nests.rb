class CreateNests < ActiveRecord::Migration
  def change
    create_table :nests do |t|
      t.string :name

      t.timestamps
    end
  end
end
