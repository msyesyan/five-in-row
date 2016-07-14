Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  devise_for :users, controllers: { sessions: 'sessions' }
  root 'users#index'

  resources :users, only: :index
end
