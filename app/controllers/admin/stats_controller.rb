class Admin::StatsController < Admin::BaseController

  def index
    @most_chosen_items = Compare.most_chosen_items
  end

  #show the top-10 winning items in a pie-chart or cool graph
  #1) How many times does an item appear on the compare table?
  #2) How many times was it chosen?
  #3) How many times was it unchosen?


  #with their win percentages, images as well

  #win % = Total number of wins / total number of compares

  #show the top-10 loosing items in a pie-chart or cool graph
  #as well

  #can sort by category, location, sex, and age range

end