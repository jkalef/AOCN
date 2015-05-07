class Item < ActiveRecord::Base
  belongs_to :category

  has_many :chosen_compares, dependent: :destroy, 
              class_name: 'Compare', foreign_key: :chosen_item_id

  has_many :unchosen_compares, dependent: :destroy,
              class_name: 'Compare', foreign_key: :unchosen_item_id

  has_many :users_who_compared, through: :compares, source: :user 

  has_many :likes, dependent: :destroy
  has_many :users_who_liked, through: :likes, source: :user

  #validates :picture, presence: true
  validates :title, presence: true
end
