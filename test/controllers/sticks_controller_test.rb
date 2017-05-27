require 'test_helper'

class SticksControllerTest < ActionController::TestCase
  setup do
    @stick = sticks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:sticks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create stick" do
    assert_difference('Stick.count') do
      post :create, stick: { name: @stick.name, nest_id: @stick.nest_id }
    end

    assert_redirected_to stick_path(assigns(:stick))
  end

  test "should show stick" do
    get :show, id: @stick
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @stick
    assert_response :success
  end

  test "should update stick" do
    patch :update, id: @stick, stick: { name: @stick.name, nest_id: @stick.nest_id }
    assert_redirected_to stick_path(assigns(:stick))
  end

  test "should destroy stick" do
    assert_difference('Stick.count', -1) do
      delete :destroy, id: @stick
    end

    assert_redirected_to sticks_path
  end
end
