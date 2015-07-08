Optho::Application.routes.draw do
  resources :invoices

  resources :inovices

  resources :consults

  resources :billable_items

  resources :businesses

  resources :accounts

  resources :concession_types

  resources :payment_types

  resources :contacts

  resources :expenses

  #get "/" => "taxes#index", :as => "root"

  resources :taxes

  resources :templates

  resources :products

  resources :checkouts

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users
  get "admin/index"
  controller :sessions do
    get 'new'
    get 'create'
    get 'destroy'
    post 'new'

  end
  post "sessions/new"
  get "sessions/new"
  get "sessions/create"
  get "sessions/destroy"
  resources :users

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

  
  scope '/api' do
    resources :patients do
      collection do
        get 'find'
        get 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
    resources :products do
      collection do
        get 'find'
        get 'index'
        post 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
    resources :consults do
      collection do
        get 'find'
        get 'index'
        post 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end

    resources :billable_items do
    collection do
      get 'find'
      get 'index'
      post 'index'
      post 'create'
      post 'destroy'
      post 'edit'
      get 'update'
      get 'show'
    end
    member do
      post 'destroy'
      post 'update'
      get 'edit'
      patch 'edit'
      patch 'update'
      post 'edit'
      get 'show'
    end
  end
    resources :expenses do
      collection do
        get 'find'
        get 'index'
        post 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
    resources :invoices do
      collection do
        get 'find'
        get 'index'
        post 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
    resources :businesses do
      collection do
        get 'find'
        get 'index'
        post 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
    resources :contacts do
      collection do
        get 'find'
        get 'index'
        post 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
    resources :taxes do
      collection do
        get 'find'
        get 'index'
        post 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
    resources :payment_types do
      collection do
        get 'find'
        get 'index'
        post 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
    resources :concession_types do
      collection do
        get 'find'
        get 'index'
        post 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
    resources :appointments do
      collection do
        get 'find'
        get 'index'
        post 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
    resources :templates do
      collection do
        get 'find'
        get 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
    resources :consult_templates do
      collection do
        get 'find'
        get 'index'
        post 'create'
        post 'destroy'
        post 'edit'
        get 'update'
        get 'show'
      end
      member do
        post 'destroy'
        post 'update'
        get 'edit'
        patch 'edit'
        patch 'update'
        post 'edit'
        get 'show'
      end
    end
  end # api scope

resources :doctors do

    collection do
      get 'search'
      get 'list'
      post 'list'
    end
  end

  resources :consultations


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'taxes#index'
  match '/', to: 'taxes#index', via: [:get, :post]




  
  # =========================================
  # = Routing for the API (used by Angular) =
  # =========================================

  namespace :api, defaults: {format: :json} do
  resources :consultations, only: [:index]
  resources :patients, only:[:index, :create, :update, :destroy]
  resources :consult_templates, only:[:index, :create, :update, :destroy]
  resources :consulttemplates, only:[:index, :create, :update, :destroy]
  resources :products, only:[:index, :create, :update, :destroy]
  resources :templates, only:[:index, :create, :update, :destroy]
  resources :taxes, only:[:index, :create, :update, :destroy]
  resources :appointments, only:[:index, :create, :update, :destroy]
  resources :expenses, only:[:index, :create, :update, :destroy]
  resources :contacts, only:[:index, :create, :update, :destroy]
  resources :payment_types, only:[:index, :create, :update, :destroy]
  resources :concession_types, only:[:index, :create, :update, :destroy]
  resources :businesses, only:[:index, :create, :update, :destroy]
  resources :billable_items, only:[:index, :create, :update, :destroy]
  resources :invoices, only:[:index, :create, :update, :destroy]

end
  scope :api do

  end
    get "/appointments(.:format)" => "appointments#index"
    get "/appointments/.id(.:format)" => "appointments#index"
    get "/patients(.:format)" => "patients#index"
    get "/patients/.id(.:format)" => "patients#index"
    get "/consulttemplates(.:format)" => "consultemplates#index"
    get "/consulttemplates/.id(.:format)" => "consultemplates#index"
    get "/products(.:format)" => "products#index"
    get "/products/.id(.:format)" => "products#index"
    get "/templates(.:format)" => "templates#index"
    get "/templates/.id(.:format)" => "templates#index"
    get "/taxes(.:format)" => "taxes#index"
    get "/taxes/.id(.:format)" => "taxes#index"
    get "/expenses(.:format)" => "expenses#index"
    get "/expenses/.id(.:format)" => "expenses#index"
    get "/contacts(.:format)" => "contacts#index"
    get "/contacts/.id(.:format)" => "contacts#index"
    get "/payment_types(.:format)" => "payment_types#index"
    get "/payment_types/.id(.:format)" => "payment_types#index"
    get "/concession_types(.:format)" => "concession_types#index"
    get "/concession_types/.id(.:format)" => "concession_types#index"
    get "/businesses(.:format)" => "businesses#index"
    get "/businesses/.id(.:format)" => "businesses#index"
    get "/billable_items(.:format)" => "billable_items#index"
    get "/billable_items/.id(.:format)" => "billable_items#index"
    get "/invoices(.:format)" => "invoices#index"
    get "/invoices/.id(.:format)" => "invoices#index"
    get "/example(.:format)" => "example#index"
    get "/example/.id(.:format)" => "example#index"
    get "/calendar(.:format)" => "calendar#index"
    get "/calendar/.id(.:format)" => "calendar#index"


end

