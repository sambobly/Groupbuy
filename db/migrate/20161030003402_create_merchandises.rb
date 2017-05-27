class CreateMerchandises < ActiveRecord::Migration
  def change
    create_table :merchandises do |t|
      t.decimal :value
      t.references :category, index: true
      t.references :consumer, index: true
      t.text :title
      t.text :description
      t.datetime :start
      t.datetime :end

      t.timestamps
    end
  end
end
