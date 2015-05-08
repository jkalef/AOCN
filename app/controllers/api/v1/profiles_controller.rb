class Api::V1::ProfilesController < Api::V1::BaseController

  def update
    user = User.where(api_key: params[:api_key])[0]
    profile = user.profile
    profile.update(profile_params)
    render :nothing => true
  end

  private

  def profile_params
    params.require(:profile).permit(:age, :sex, :location)
  end

end