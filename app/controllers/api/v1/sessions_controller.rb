class Api::V1::SessionsController < Api::V1::BaseController

  def create
    user = User.find_by_email params[:user][:email]
    if user && user.authenticate(params[:user][:password])
      render json: {user: user}
    else
      render nothing: true
    end
  end

end