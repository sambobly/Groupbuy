class CreateCombinations < ActiveRecord::Migration
  def change
    create_table :combinations do |t|
      t.string :onea
      t.string :oneb
      t.string :twoa
      t.string :twob
      t.string :threea
      t.string :threeb
      t.string :foura
      t.string :fourb
      t.string :fivea
      t.string :fiveb
      t.string :sixa
      t.string :sixb
      t.string :sevena
      t.string :sevenb
      t.string :eighta
      t.string :eightb
      t.string :ninea
      t.string :nineb
      t.string :tena
      t.string :tenb
      t.string :result
      t.boolean :complete

      t.timestamps null: false
    end
  end
end
