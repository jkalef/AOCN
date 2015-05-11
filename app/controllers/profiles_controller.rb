class ProfilesController < ApplicationController

  
  def edit
    @profile = Profile.find params[:id]
    @age_range = Profile.age_range
    @sex = Profile.gender_select
    @locations = Profile.location_range
  end


  def update
    @profile = Profile.find params[:id]
    if @profile.update(profile_params)
      redirect_to play_path, notice: "Have fun!!!"
    else
      render :edit
      flash[:alert] = "Something went wrong. Please Try Again"
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:age, :location, :sex, :dating_enabled)
  end

end
