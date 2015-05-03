class Compare < ActiveRecord::Base
  belongs_to :user

  belongs_to :chosen_item, class: Item
  belongs_to :unchosen_item, class: Item
end
