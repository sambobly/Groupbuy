require 'test_helper'

class ConsultTemplatesControllerTest < ActionController::TestCase
  setup do
    @consult_template = consult_templates(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:consult_templates)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create consult_template" do
    assert_difference('ConsultTemplate.count') do
      post :create, consult_template: { content: @consult_template.content, name: @consult_template.name }
    end

    assert_redirected_to consult_template_path(assigns(:consult_template))
  end

  test "should show consult_template" do
    get :show, id: @consult_template
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @consult_template
    assert_response :success
  end

  test "should update consult_template" do
    patch :update, id: @consult_template, consult_template: { content: @consult_template.content, name: @consult_template.name }
    assert_redirected_to consult_template_path(assigns(:consult_template))
  end

  test "should destroy consult_template" do
    assert_difference('ConsultTemplate.count', -1) do
      delete :destroy, id: @consult_template
    end

    assert_redirected_to consult_templates_path
  end
end
