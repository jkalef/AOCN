class Api:V1::ProfilesController < Api::V1::BaseController

  def update
    user = User.where(api_key: params[:api_key])[0]
    profile = user.profile
    profile.update(profile_params)
    render json: {user: user}
  end

end