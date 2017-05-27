class AddTaxToWidget < ActiveRecord::Migration
  def change
    add_reference :widgets, :tax, index: true
  end
end
