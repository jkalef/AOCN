class Api::V1::UsersController < Api::Vi::BaseController

  def create
    user = User.new(user_params)
    user.save
    render json: {user: user}
  end

  def update
    user = User.where(api_key: params[:api_key])[0]
    user.update(user_params)
    render json: {user: user}
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
