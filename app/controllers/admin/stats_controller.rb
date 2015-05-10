class Admin::StatsController < Admin::BaseController

  def index
  end

  def show
    @top_dogs = Item.top_10_selected_overall
    @bottom_dogs = Item.bottom_10_selected_overall
    @top_for_guys = Item.crazy_query

    render json: { top_dogs: @top_dogs,
                   bottom_dogs: @bottom_dogs,
                   top_for_guys: @top_for_guys }
  end

end