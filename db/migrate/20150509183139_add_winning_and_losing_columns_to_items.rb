class AddWinningAndLosingColumnsToItems < ActiveRecord::Migration
  def change
    add_column :items, :total_compares, :float
    add_column :items, :win_percentage, :float
    add_column :items, :lose_percentage, :float
  end
end
