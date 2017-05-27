class CreateProcurators < ActiveRecord::Migration
  def change
    create_table :procurators do |t|
      t.text :name
      t.references :invoice, index: true

      t.timestamps
    end
  end
end
