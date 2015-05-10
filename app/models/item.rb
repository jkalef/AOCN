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
  # validates :title, presence: true

  def calculate_win_percentage
    ActiveRecord::Base.transaction do
      calc_total_compares
      calc_win_percentage
      save ? self :false
    end
  end

  def calculate_lose_percentage
    ActiveRecord::Base.transaction do
      calc_total_compares
      calc_lose_percentage
      save ? self :false
    end
  end

  def calc_total_compares
    self.total_compares = chosen_compares.count.to_f + unchosen_compares.count.to_f
  end

  def calc_win_percentage
    self.win_percentage = chosen_compares.count.to_f / total_compares.to_f
  end

  def calc_lose_percentage
    self.lose_percentage = unchosen_compares.count.to_f / total_compares.to_f
  end

  def self.top_10_selected_overall
    order(win_percentage: "DESC").limit(5)
  end

  def self.bottom_10_selected_overall
    order(lose_percentage: "DESC").limit(5)
  end



end
