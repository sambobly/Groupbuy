class CreateWishes < ActiveRecord::Migration
  def change
    create_table :wishes do |t|
      t.references :consumer, index: true
      t.references :merchandise, index: true

      t.timestamps
    end
  end
end
