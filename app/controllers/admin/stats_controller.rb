class Admin::StatsController < Admin::BaseController

  layout "/layouts/statistics"

  def index
    @locations = Profile.location_range
    @age_range = Profile.age_range
    @sex = Profile.gender_select
    @categories = Category.category_names
    #display winning records or losing records
    @win_or_lose_records = ["win", "lose"]
    #number of records to display on the chart
    @record_count = [1,2,3,4,5,6,7,8,9,10]
  end

  def show
    @top_dogs = Item.top_10_selected_overall
    @bottom_dogs = Item.bottom_10_selected_overall

    render json: { top_dogs: @top_dogs,
                   bottom_dogs: @bottom_dogs }

  end

  def create
    gender = params[:gender]
    age_1 = params[:age_1]
    age_2 = params[:age_2]
    location = params[:location]
    win_or_lose = params[:win_or_lose]
    record_count = params[:record_count]

    filtered_query = Item.crazy_query(win_or_lose, record_count, 
                                        gender, age_1, age_2, location)
    render json: { filtered_query: filtered_query }
  end

  def category_compare
    cat_1 = params[:cat_1]
    cat_2 = params[:cat_2]
    query = Compare.compare_query(cat_1, cat_2)
    render json: { query: query }
  end

end