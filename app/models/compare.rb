class Compare < ActiveRecord::Base
  belongs_to :user

  belongs_to :chosen_item, class: Item
  belongs_to :unchosen_item, class: Item

  after_save :update_items

  def self.most_chosen_items
    Compare.group(:chosen_item_id).count
  end

  private

  def update_items
    chosen_item.calculate_win_percentage
    unchosen_item.calculate_win_percentage

    chosen_item.calculate_lose_percentage
    unchosen_item.calculate_lose_percentage
  end

end