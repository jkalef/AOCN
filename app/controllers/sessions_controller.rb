class SessionsController < ApplicationController

  layout "external"

  def new
  end

  def create
    @user = User.find_by_email params[:email]
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to play_path
    else
      flash[:alert] = "Invalid Username and/or Password."
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    flash[:notice] = "Logged Out Successfully.  Thank you for playing."
    redirect_to root_path
  end

end
