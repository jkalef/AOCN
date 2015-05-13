class AddUnchosenItemCategoryIdToCompares < ActiveRecord::Migration
  def change
    add_column :compares, :unchosen_item_category_id, :integer
    add_column :compares, :chosen_item_category_id, :integer
  end
end
