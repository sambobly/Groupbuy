class CreateSticks < ActiveRecord::Migration
  def change
    create_table :sticks do |t|
      t.text :name
      t.references :nest, index: true

      t.timestamps
    end
  end
end
