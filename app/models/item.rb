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
  #validates :title, presence: true

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

  #-----------------------------------------------
  # SPECIFIC SEARCH FILTER METHOD ----------------
  #-----------------------------------------------

  def self.crazy_query(win_or_lose, record_count, gender = nil, age_1 = nil, age_2 = nil, location = nil)
    myObject = []

    profiles = Profile.all
    profiles = profiles.where("sex = ?", gender) if gender.present?
    profiles = profiles.where("age > ?", age_1) if age_1.present?
    profiles = profiles.where("age < ?", age_2) if age_2.present?
    profiles = profiles.where("location = ?", location) if location.present?
    user_ids = profiles.pluck(:user_id)

    Item.all.each do |item|
      wins = 0
      loses = 0

      # profiles = Profile.where("sex = ? and age > ? and age < ? and location = ?", 
      #                                 "#{gender}", "#{age_1}", "#{age_2}", "#{location}")
      user_ids.each do |user_id|
        wins += item.chosen_compares.where(user_id: user_id).count
        loses += item.unchosen_compares.where(user_id: user_id).count
      end
      
      total = wins + loses
      h = Hash.new
      h["id"] = item.id
      h["title"] = item.title
      h["total_compares"] = wins + loses
      h["win_percentage"] = wins.to_f / total.to_f
      h["lose_percentage"] = loses.to_f / total.to_f
      h["wins"] = wins
      h["loses"] = loses
      h["picture"] = item.picture

      if h["total_compares"] != 0 
        myObject << h
      end 
    end
    myObject

    if win_or_lose == "win"
      sortedObject = myObject.sort_by { |x| x['win_percentage'] }.reverse
    elsif win_or_lose == "lose"
      sortedObject = myObject.sort_by { |x| x['lose_percentage'] }.reverse
    end

    #convert the record count to an integer so it can be used in the range
    n = record_count.to_i - 1
    if sortedObject.length <= 5
      return sortedObject
    else
      return sortedObject[0..n]
    end

  end

end
