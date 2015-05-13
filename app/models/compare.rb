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

  def self.compare_query(cat_1, cat_2)
    #find all of the comparisons where these 2 categories are
    #put up against each other (will work with tags as well if we implement
    #a tag model)
    category_1 = Category.where(name: cat_1)[0]
    category_2 = Category.where(name: cat_2)[0]
    category_1_id = category_1.id
    category_2_id = category_2.id

    compares = Compare.all
    compares = compares.where("chosen_item_category_id = ? or unchosen_item_category_id = ?",
                                                                    category_1_id, category_1_id)
    compares = compares.where("chosen_item_category_id = ? or unchosen_item_category_id = ?",
                                                                        category_2_id, category_2_id)

    #tally up the wins and loses for each category
    cat_1_wins = compares.where(chosen_item_category_id: category_1_id).count
    cat_1_loses = compares.where(unchosen_item_category_id: category_1_id).count

    cat_2_wins = compares.where(chosen_item_category_id: category_2_id).count
    cat_2_loses = compares.where(unchosen_item_category_id: category_2_id).count
  
    total = compares.count

    myObject = {
      category_1: category_1_id,
      category_2: category_2_id,
      category_1_name: category_1.name,
      category_2_name: category_2.name,
      category_1_win_percentage: cat_1_wins.to_f / total.to_f * 100,
      category_2_win_percentage: cat_2_wins.to_f / total.to_f * 100
    }

  end
end