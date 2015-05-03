class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.references :user, index: true, foreign_key: true
      t.integer :age
      t.string :location
      t.string :sex
      t.boolean :dating_enabled

      t.timestamps null: false
    end
  end
end
