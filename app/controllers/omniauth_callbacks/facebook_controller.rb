class OmniauthCallbacks::FacebookController < ApplicationController

  def index
    #view the data
    omniauth_data = request.env['omniauth_data'].to_hash
    render json: omniauth_data
  end


end
