class Admin::StatsController < Admin::BaseController

  def index
    @locations = Profile.location_range
    @age_range = Profile.age_range
    @sex = Profile.gender_select
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

    filtered_query = Item.crazy_query(gender, age_1, age_2, location)
    render json: { filtered_query: filtered_query }
  
    #I should have an option for how many records to select, 
    #and if you want to see the HIGHEST x records for a specific
    #category, or the LOWEST x records for a specific category

    #Next batch of queries::  When presented with an animal or food,
    #what are people more likely to pick??

    #find all the items with a tag of "food" that have been compared
    #with a tag of "animal"

    #then, calculate the win/lose percentage of each item within those
    #comparisons


  end

end