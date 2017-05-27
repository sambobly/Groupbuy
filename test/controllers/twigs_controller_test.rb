require 'test_helper'

class TwigsControllerTest < ActionController::TestCase
  setup do
    @twig = twigs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:twigs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create twig" do
    assert_difference('Twig.count') do
      post :create, twig: { name: @twig.name, nest_id: @twig.nest_id }
    end

    assert_redirected_to twig_path(assigns(:twig))
  end

  test "should show twig" do
    get :show, id: @twig
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @twig
    assert_response :success
  end

  test "should update twig" do
    patch :update, id: @twig, twig: { name: @twig.name, nest_id: @twig.nest_id }
    assert_redirected_to twig_path(assigns(:twig))
  end

  test "should destroy twig" do
    assert_difference('Twig.count', -1) do
      delete :destroy, id: @twig
    end

    assert_redirected_to twigs_path
  end
end
