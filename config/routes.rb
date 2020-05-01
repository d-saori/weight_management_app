Rails.application.routes.draw do
  devise_for :users
  # get 'graphs/index'
  root 'graphs#index'
end
