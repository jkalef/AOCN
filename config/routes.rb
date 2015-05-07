Rails.application.routes.draw do

  #--For Admins and Viewing Stats ------------------
  namespace :admin do
    resources :stats, only: [:index]
    resources :categories
    resources :items, only: [:destroy]
  end

  #--For Users and Sessions -------------------------
  resources :users
  resources :profiles, only: [:edit, :update, :show]

  resources :sessions, only: [:new, :create] do
    delete :destroy, on: :collection
  end

  root "sessions#new"

  # resources :omniauth_callbacks do
  #   resources :facebook, only: :index
  # end

  #maybe add a nice welcome page!
  #root "welcome#index"

  #--For Gameplay------------------------------------
  get "/play/categories"                         => "play#get_categories"

  get "/play"                                    => "play#index",  as: :play
  get "/play/show"                               => "play#show",   as: :play_compare
  post "/play/show/:extension/:item_1/:item_2/"  => "play#create", as: :create_comparison
  
end
