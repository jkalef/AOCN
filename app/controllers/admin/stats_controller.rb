class Admin::StatsController < Admin::BaseController

  layout "/layouts/statistics"

  def index
    @locations = Profile.location_range
    @age_range = Profile.age_range
    @sex = Profile.gender_select
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
    #I should have an option for how many records to select, 
    #and if you want to see the HIGHEST x records for a specific
    #category, or the LOWEST x records for a specific category

    #Next batch of queries::  When presented with an animal or food,
    #what are people more likely to pick??

    #search all compares for a specific tag vs. another specific tag
    #OR just add it to the title??

    #compare.where compared_item && uncompared_item contains the tag __
    #that will give me all of the compares
    #then, I can go through them and find the winners and losers and 
    #go from there....

    #then, calculate the percentage wins/loses for the tags
  end
end