class AddColumnsToEggs < ActiveRecord::Migration
  def change
    add_column :eggs, :content, :text
  end
end
