Rails.application.routes.draw do
  get 'fireworks/show'
  root "staticpages#top"
  get 'staticpages/top'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :clicks
  get "fireworks", to: 'fireworks#show'
end
