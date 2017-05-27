require 'test_helper'

class ConcessionTypesControllerTest < ActionController::TestCase
  setup do
    @concession_type = concession_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:concession_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create concession_type" do
    assert_difference('ConcessionType.count') do
      post :create, concession_type: { name: @concession_type.name, percentage: @concession_type.percentage }
    end

    assert_redirected_to concession_type_path(assigns(:concession_type))
  end

  test "should show concession_type" do
    get :show, id: @concession_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @concession_type
    assert_response :success
  end

  test "should update concession_type" do
    patch :update, id: @concession_type, concession_type: { name: @concession_type.name, percentage: @concession_type.percentage }
    assert_redirected_to concession_type_path(assigns(:concession_type))
  end

  test "should destroy concession_type" do
    assert_difference('ConcessionType.count', -1) do
      delete :destroy, id: @concession_type
    end

    assert_redirected_to concession_types_path
  end
end
