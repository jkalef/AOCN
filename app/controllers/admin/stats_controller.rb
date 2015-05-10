class Admin::StatsController < Admin::BaseController

  def index
  end

  def show
    @top_dogs = Item.top_10_selected_overall
    @bottom_dogs = Item.bottom_10_selected_overall
    render json: { top_dogs: @top_dogs,
                   bottom_dogs: @bottom_dogs }
  end

end