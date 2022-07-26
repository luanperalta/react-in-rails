Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :airlines, only: [:index, :show], param: :slug
      resources :reviews, only: [:create, :destroy]
    end
  end
  root 'home#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '*path', to: 'home#index', via: :all
end
