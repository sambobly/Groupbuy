require 'test_helper'

class ProcuratorsControllerTest < ActionController::TestCase
  setup do
    @procurator = procurators(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:procurators)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create procurator" do
    assert_difference('Procurator.count') do
      post :create, procurator: { invoice_id: @procurator.invoice_id, name: @procurator.name }
    end

    assert_redirected_to procurator_path(assigns(:procurator))
  end

  test "should show procurator" do
    get :show, id: @procurator
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @procurator
    assert_response :success
  end

  test "should update procurator" do
    patch :update, id: @procurator, procurator: { invoice_id: @procurator.invoice_id, name: @procurator.name }
    assert_redirected_to procurator_path(assigns(:procurator))
  end

  test "should destroy procurator" do
    assert_difference('Procurator.count', -1) do
      delete :destroy, id: @procurator
    end

    assert_redirected_to procurators_path
  end
end
