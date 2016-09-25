Rails.application.routes.draw do

  namespace :api do
    resources :events, only: [:index, :create, :update, :destroy] do
      get :search, on: :collection
    end
  end

  root 'dashboard#index'
end
