class CreateConsultTemplates < ActiveRecord::Migration
  def change
    create_table :consult_templates do |t|
      t.text :name
      t.text :content

      t.timestamps
    end
  end
end
