class User < ActiveRecord::Base
  has_secure_password

  has_one :profile, dependent: :destroy

  has_many :compares, dependent: :destroy
  has_many :items_compared, through: :compares, source: :item

  # has_many :chosen_items, through: :compares, source: :item
  # has_many :unchosen_items, through: :compares, source: :item

  has_many :likes, dependent: :destroy
  has_many :liked_items, through: :likes, source: :item

  validates :email, presence: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, 
                              :on => :create
end
