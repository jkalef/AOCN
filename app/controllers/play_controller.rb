class PlayController < ApplicationController

  def index
    @categories = Category.where("name != ?", "Chuck Norris")
  end

  def show
    game_play
  end

  def create
    chosen_item_id    = params[:item_1]
    unchosen_item_id  = params[:item_2]
    game_mode         = params[:extension]

    chosen_item = Item.find_by_id(chosen_item_id) 
    unchosen_item = Item.find_by_id(unchosen_item_id)
  
    comparison = current_user.compares.new(chosen_item_id: chosen_item.id, 
                                           unchosen_item_id: unchosen_item.id,
                                           chosen_item_category_id: chosen_item.category_id,
                                           unchosen_item_category_id: unchosen_item.category_id)
    comparison.save
  
    #same category gameplay
    if game_mode.include? "category"
      category_1 = chosen_item.category
      category_2 = unchosen_item.category
    #chuck norris
    elsif game_mode.include? "chuck"
      category_1 = Category.where("name = ?", "Chuck Norris")[0]
      category_2 = Category.all.sample
    #random game play
    elsif game_mode.include? "random"
      category_1 = Category.all.sample
      category_2 = Category.all.sample 
    end

    @item_1 = category_1.items.sample
    @item_2 = category_2.items.where("id != ?", @item_1.id).sample

    render json: { item_1: @item_1, item_2: @item_2 }
  end


  private

  def game_play
    if params[:category_id]
      category_1 = Category.find params[:category_id]
      category_2 = Category.find params[:category_id]
    elsif params[:random]
      category_1 = Category.all.sample
      category_2 = Category.all.sample
    elsif params[:chuck_norris]
      category_1 = Category.where("name = ?", "Chuck Norris")[0]
      category_2 = Category.all.sample
    end

    @item_1 = category_1.items.sample
    @item_2 = category_2.items.where("id != ?", @item_1.id).sample

    render json: { item_1: @item_1, item_2: @item_2 }

    # Item.where(category_id: 8).order("RANDOM()").first
  end

end



