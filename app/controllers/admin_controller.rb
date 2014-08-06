class AdminController < ApplicationController
  ActiveAdmin.register AdminUser do
    controller do
      def permitted_params
        params.permit admin_user: [:email, :password, :password_confirmation]
      end
    end
  end
  def index
  end
end
