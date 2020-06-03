Rails.application.routes.draw do
  devise_for :users
  # get 'graphs/index'
  root 'graphs#index'
  # resource「s」ではない(updateに「:id」は不要の為)
  resource :graphs, only: %i[:index create update]
end
