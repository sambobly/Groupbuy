class AddColumnsToLineItems < ActiveRecord::Migration
  def change
    add_column :line_items, :check_in_time, :datetime
    add_column :line_items, :check_out_time, :datetime
    add_column :line_items, :checked_in, :boolean, default: true
  end
end
