Rails.application.routes.draw do
  root "staticpages#top"
  get "fireworks", to: 'fireworks#show'
end
