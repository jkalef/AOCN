class Compare < ActiveRecord::Base
  belongs_to :user

  belongs_to :chosen_item, class: Item
  belongs_to :unchosen_item, class: Item


  def self.most_chosen_items
    Compare.group(:chosen_item_id).count
  end

end