Rails.application.routes.draw do

  #--For Admins and Viewing Stats ------------------
  namespace :admin do
    resources :stats, only: [:index]
    resources :categories
  end

  #--For Users and Sessions -------------------------
  resources :users
  resources :profiles, only: [:edit, :update, :show]

  resources :sessions, only: [:new, :create] do
    delete :destroy, on: :collection
  end

  root "sessions#new"

  #maybe add a nice welcome page!
  #root "welcome#index"

  #--For Gameplay------------------------------------
  get "/play"                                    => "play#index",  as: :play
  get "/play/show"                               => "play#show",   as: :play_compare
  post "/play/show/:extension/:item_1/:item_2/"  => "play#create", as: :create_comparison
  
end
