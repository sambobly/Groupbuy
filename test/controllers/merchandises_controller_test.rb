require 'test_helper'

class MerchandisesControllerTest < ActionController::TestCase
  setup do
    @merchandise = merchandises(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:merchandises)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create merchandise" do
    assert_difference('Merchandise.count') do
      post :create, merchandise: { category_id: @merchandise.category_id, consumer_id: @merchandise.consumer_id, description: @merchandise.description, end: @merchandise.end, start: @merchandise.start, title: @merchandise.title, value: @merchandise.value }
    end

    assert_redirected_to merchandise_path(assigns(:merchandise))
  end

  test "should show merchandise" do
    get :show, id: @merchandise
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @merchandise
    assert_response :success
  end

  test "should update merchandise" do
    patch :update, id: @merchandise, merchandise: { category_id: @merchandise.category_id, consumer_id: @merchandise.consumer_id, description: @merchandise.description, end: @merchandise.end, start: @merchandise.start, title: @merchandise.title, value: @merchandise.value }
    assert_redirected_to merchandise_path(assigns(:merchandise))
  end

  test "should destroy merchandise" do
    assert_difference('Merchandise.count', -1) do
      delete :destroy, id: @merchandise
    end

    assert_redirected_to merchandises_path
  end
end
