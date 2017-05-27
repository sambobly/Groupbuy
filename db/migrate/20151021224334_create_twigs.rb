class CreateTwigs < ActiveRecord::Migration
  def change
    create_table :twigs do |t|
      t.text :name
      t.references :nest, index: true

      t.timestamps
    end
  end
end
