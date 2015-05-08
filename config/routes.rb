Rails.application.routes.draw do

  #--For Phone API ---------------------------------
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :update]
      post "/profiles/:api_key"                              => "profiles#update"
      get "/play/categories"                                 => "play#get_categories"
      get "/play/show"                                       => "play#show"  
      post "/play/show/:extension/:item_1/:item_2/:api_key"  => "play#create"
    end
  end

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

  #maybe add a nice welcome page!
  #root "welcome#index"

  #--For Gameplay------------------------------------
  get "/play"                                    => "play#index",  as: :play
  get "/play/show"                               => "play#show",   as: :play_compare
  post "/play/show/:extension/:item_1/:item_2/"  => "play#create", as: :create_comparison
  
end
