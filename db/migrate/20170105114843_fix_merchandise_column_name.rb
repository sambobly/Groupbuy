class FixMerchandiseColumnName < ActiveRecord::Migration
  def change
   rename_column :merchandises, :category, :category_name

  end
end
