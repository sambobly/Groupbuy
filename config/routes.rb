Optho::Application.routes.draw do
  resources :meetings

  resources :procurators

  resources :widgets

  resources :lines

  resources :sticks

  resources :twigs

  resources :birds

  resources :eggs

  resources :nests

  resources :patients

  resources :tests

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

  resources :tests


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


  resources :nests do
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

  resources :patients do
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

  resources :eggs do
    collection do
      get 'find'
      get 'index'
      post 'create'
      post 'destroy'
      get 'edit'
      post 'index'
    end
    member do
      delete 'destroy'
      post 'update'
      post 'create'
      get 'edit'
      patch 'edit'
      patch 'update'
      post 'index'
    end
  end
  resources :meetings do
    collection do
      get 'find'
      get 'index'
      post 'create'
      post 'destroy'
      get 'edit'
      post 'index'
    end
    member do
      delete 'destroy'
      post 'update'
      post 'create'
      get 'edit'
      patch 'edit'
      patch 'update'
      post 'index'
    end
  end
  resources :lines do
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
  resources :twigs do
    collection do
      get 'find'
      get 'index'
      post 'create'
      post 'destroy'
      get 'edit'
      post 'index'
    end
    member do
      delete 'destroy'
      post 'update'
      post 'create'
      get 'edit'
      patch 'edit'
      patch 'update'
      post 'index'
    end
  end

  resources :birds do
    collection do
      get 'find'
      get 'index'
      post 'create'
      post 'destroy'
      get 'edit'
      post 'index'
    end
    member do
      delete 'destroy'
      post 'update'
      post 'create'
      get 'edit'
      patch 'edit'
      patch 'update'
      post 'index'
    end
  end

  resources :payments do
    collection do
      get 'find'
      get 'index'
      post 'create'
      post 'destroy'
      get 'edit'
      post 'index'
    end
    member do
      delete 'destroy'
      post 'update'
      post 'create'
      get 'edit'
      patch 'edit'
      patch 'update'
      post 'index'
    end
  end

  resources :widgets do
    collection do
      get 'find'
      get 'index'
      post 'create'
      post 'destroy'
      get 'edit'
      post 'index'
    end
    member do
      delete 'destroy'
      post 'update'
      post 'create'
      get 'edit'
      patch 'edit'
      patch 'update'
      post 'index'
    end
  end

  resources :procurators do
    collection do
      get 'find'
      get 'index'
      post 'create'
      post 'destroy'
      get 'edit'
      post 'index'
    end
    member do
      delete 'destroy'
      post 'update'
      post 'create'
      get 'edit'
      patch 'edit'
      patch 'update'
      post 'index'
    end
  end

  resources :line_items do
  collection do
    get 'find'
    get 'index'
    post 'create'
    post 'destroy'
    get 'edit'
    post 'index'
  end
  member do
    delete 'destroy'
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
    resources :lines do
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
    resources :tests do
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
      resources :payments do
        collection do
          get 'find'
          get 'index'
          post 'create'
          post 'destroy'
          get 'edit'
          post 'index'
        end
        member do
          delete 'destroy'
          post 'update'
          post 'create'
          get 'edit'
          patch 'edit'
          patch 'update'
          post 'index'
        end
      end
      resources :lines do
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
      resources :procurators do
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
      resources :widgets do
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
    resources :sticks do
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
    resources :nests do
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
      resources :eggs do
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
    end

    resources :doctors do
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
    end

    resources :patients do
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
    end

    resources :eggs do
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

    resources :meetings do
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

    resources :birds do
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

    resources :payments do
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

    resources :widgets do
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

    resources :procurators do
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

    resources :twigs do
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

    resources :doctors do
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
    resources :consulttemplates do
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
  resources :consult_templates, only:[:index, :create, :update, :destroy]
  resources :consults, only:[:index, :create, :update, :destroy]
  resources :consulttemplates, only:[:index, :create, :update, :destroy]
  resources :products, only:[:index, :create, :update, :destroy]
  resources :templates, only:[:index, :create, :update, :destroy]
  resources :taxes, only:[:index, :create, :update, :destroy]
  resources :sticks, only:[:index, :create, :update, :destroy]
  resources :doctors, only:[:index, :create, :update, :destroy] do

  resources :appointments, only:[:index, :create, :update, :destroy] do
    resources :consults, only:[:index, :create, :update, :destroy]
  end
  resources :expenses, only:[:index, :create, :update, :destroy]
  resources :tests, only:[:index, :create, :update, :destroy]
  resources :contacts, only:[:index, :create, :update, :destroy]
  resources :payment_types, only:[:index, :create, :update, :destroy]
  resources :concession_types, only:[:index, :create, :update, :destroy]
  resources :businesses, only:[:index, :create, :update, :destroy]
  resources :billable_items, only:[:index, :create, :update, :destroy]
  resources :invoices, only:[:index, :create, :update, :destroy] do
    resources :lines, only:[:index, :create, :update, :destroy]
    resources :procurators, only:[:index, :create, :update, :destroy]
    resources :widgets, only:[:index, :create, :update, :destroy]
    resources :payments, only:[:index, :create, :update, :destroy]
  end
  resources :nests, only:[:index, :create, :update, :destroy] do
    resources :eggs, only:[:index, :create, :update, :destroy]
  end
  resources :patients, only:[:index, :create, :update, :destroy] do
    resources :invoices, only:[:index, :create, :update, :destroy]
  end
  resources :eggs, only:[:index, :create, :update, :destroy]
  resources :meetings, only:[:index, :create, :update, :destroy]

  resources :birds, only:[:index, :create, :update, :destroy]
  resources :payments, only:[:index, :create, :update, :destroy]

  resources :widgets, only:[:index, :create, :update, :destroy]
  resources :procurators, only:[:index, :create, :update, :destroy]

  resources :twigs, only:[:index, :create, :update, :destroy]
  resources :lines, only:[:index, :create, :update, :destroy]



  end
  scope :api do

  end
    get "/appointments(.:format)" => "appointments#index"
    get "/appointments/.id(.:format)" => "appointments#index"
    get "/appointments/.id(.:format)/consults" => "appointments#index"
    get "/doctors(.:format)" => "doctors#index"
    get "/doctors/.id(.:format)" => "doctors#index"
    get "/doctors/.id(.:format)/consults" => "doctors#index"

  #get '/nests/.id(.:format)/eggs(.:format)' => "nests#index"#get "/patients.detail(.:format)" => "patients#index"
    get "/consulttemplates(.:format)" => "consultemplates#index"
    get "/consulttemplates/.id(.:format)" => "consultemplates#index"
    get "/products(.:format)" => "products#index"
    get "/products/.id(.:format)" => "products#index"
    get "/templates(.:format)" => "templates#index"
    get "/templates/.id(.:format)" => "templates#index"
    get "/taxes(.:format)" => "taxes#index"
    get "/taxes/.id(.:format)" => "taxes#index"
    get "/sticks(.:format)" => "sticks#index"
    get "/sticks/.id(.:format)" => "sticks#index"
    get "/expenses(.:format)" => "expenses#index"
    get "/expenses/.id(.:format)" => "expenses#index"
    get "/tests(.:format)" => "tests#index"
    get "/tests/.id(.:format)" => "tests#index"
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
    get "/invoices/.id(.:format)/lines" => "invoices#index"
    get "/invoices/.id(.:format)/procurators" => "invoices#index"
    get "/invoices/.id(.:format)/widgets" => "invoices#index"
    get "/invoices/.id(.:format)/payments" => "invoices#index"

    get "/example(.:format)" => "example#index"
    get "/example/.id(.:format)" => "example#index"
    get "/calendar(.:format)" => "calendar#index"
    get "/calendar/.id(.:format)" => "calendar#index"
    get "/patientnotes(.:format)" => "patientnotes#index"
    get "/patientnotes/patientId(.:format)" => "patientnotes#index"
    get "/nests(.:format)" => "nests#index"
    get "/nests/.id(.:format)" => "nests#index"
    get "/nests/.id(.:format)/eggs" => "nests#index"
    #get '/nests/.id(.:format)/eggs(.:format)' => "nests#index"
    get "/patients(.:format)" => "nests#index"
    get "/patients/.id(.:format)" => "nests#index"
    get "/patients/.id(.:format)/eggs" => "nests#index"
    get "/eggs(.:format)" => "eggs#index"
    get "/eggs/.id(.:format)" => "eggs#index"
    get "/meetings(.:format)" => "meetings#index"
    get "/meetings/.id(.:format)" => "meetings#index"
    get "/birds(.:format)" => "birds#index"
    get "/birds/.id(.:format)" => "birds#index"
    get "/payments(.:format)" => "payments#index"
    get "/payments/.id(.:format)" => "payments#index"
    get "/widgets(.:format)" => "widgets#index"
    get "/widgets/.id(.:format)" => "widgets#index"
    get "/procurators(.:format)" => "procurators#index"
    get "/procurators/.id(.:format)" => "procurators#index"
    get "/twigs(.:format)" => "twigs#index"
    get "/twigs/.id(.:format)" => "twigs#index"
    get "/lines(.:format)" => "lines#index"
    get "/lines/.id(.:format)" => "lines#index"

  end
  end

