class CreateClaims < ActiveRecord::Migration
  def change
    create_table :claims do |t|
      t.references :consumer, index: true, foreign_key: true
      t.references :merchandise, index: true, foreign_key: true
      t.string :email
      t.string :mobile
      t.string :account
      t.string :bsb
      t.boolean :complete

      t.timestamps null: false
    end
  end
end
