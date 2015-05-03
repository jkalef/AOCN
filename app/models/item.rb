class Item < ActiveRecord::Base
  belongs_to :category

  has_many :compares, dependent: :destroy
  has_many :users_who_compared, through: :compares, source: :user 

  has_many :likes, dependent: :destroy
  has_many :users_who_liked, through: :likes, source: :user

  #validates :picture, presence: true
  validates :title, presence: true

end
