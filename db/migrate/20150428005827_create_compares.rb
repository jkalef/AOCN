class CreateCompares < ActiveRecord::Migration
  def change
    create_table :compares do |t|
      t.integer :chosen_item_id
      t.integer :unchosen_item_id
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
