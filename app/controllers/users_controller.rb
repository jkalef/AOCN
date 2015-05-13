class UsersController < ApplicationController

  layout "external"

  def new
    @user = User.new
  end


  def create
    byebug
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to edit_profile_path(@user.profile), notice: "Signed Up Successfully.  Welcome to AOCN"
    else
      render :new
      flash[:alert] = "Sorry...something went wrong.  Please try again"
    end
  end

  #to update and edit your user info (password mainly)
  def edit
  end

  def update
  end

  def show
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end


end
