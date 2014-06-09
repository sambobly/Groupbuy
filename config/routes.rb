Optho::Application.routes.draw do
  get "admin/index"
  controller :sessions do
    get 'new'
    get 'create'
    get 'destroy'

  end
  get "sessions/new"
  get "sessions/create"
  get "sessions/destroy"
  resources :users

  mount Dashing::Engine, at: Dashing.config.engine_path
  resources :line_items do
  collection do
    get 'find'
    get 'index'
    get 'findByDate'
    get 'findNextAvailableSlot'
    post 'create'
    post 'destroy'
    get 'edit'
    post 'index'
  end
  member do
    delete 'destroy'
    get 'checkout'
    post 'update'
    post 'create'
    get 'edit'
    patch 'edit'
    patch 'update'
    post 'index'
  end
end

  resources :checkins do
    collection do
      get 'find'
      get 'index'
      get 'findByDate'
      get 'findNextAvailableSlot'
      post 'create'
      post 'destroy'
      get 'edit'
      post 'index'
    end
    member do
      delete 'destroy'
      post 'update'
      get 'edit'
      patch 'edit'
      patch 'update'
      post 'index'
    end
  end

  resources :patients

  resources :doctors do

    collection do
      get 'search'
      get 'list'
    end
  end

  resources :consultations

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'
  
  resources :appointments do
    collection do
      get 'find'
      get 'index'
      get 'findByDate'
      get 'findNextAvailableSlot'
      post 'create'
      post 'destroy'
      post 'edit'
      get 'update'
    end
    member do
      post 'destroy'
      post 'update'
      get 'edit'
      patch 'edit'
      patch 'update'
      post 'edit'
    end
  end
  
  # =========================================
  # = Routing for the API (used by Angular) =
  # =========================================
  
  namespace :api, defaults: {format: :json} do
    resources :consultations, only: [:index]
  end

end
