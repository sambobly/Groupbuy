require 'test_helper'

class ConsumersControllerTest < ActionController::TestCase
  setup do
    @consumer = consumers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:consumers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create consumer" do
    assert_difference('Consumer.count') do
      post :create, consumer: { date_of_birth: @consumer.date_of_birth, email: @consumer.email, first_name: @consumer.first_name, gender: @consumer.gender, last_name: @consumer.last_name, name: @consumer.name, number: @consumer.number, password: @consumer.password, payment_method_id: @consumer.payment_method_id, pronoun: @consumer.pronoun, public: @consumer.public }
    end

    assert_redirected_to consumer_path(assigns(:consumer))
  end

  test "should show consumer" do
    get :show, id: @consumer
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @consumer
    assert_response :success
  end

  test "should update consumer" do
    patch :update, id: @consumer, consumer: { date_of_birth: @consumer.date_of_birth, email: @consumer.email, first_name: @consumer.first_name, gender: @consumer.gender, last_name: @consumer.last_name, name: @consumer.name, number: @consumer.number, password: @consumer.password, payment_method_id: @consumer.payment_method_id, pronoun: @consumer.pronoun, public: @consumer.public }
    assert_redirected_to consumer_path(assigns(:consumer))
  end

  test "should destroy consumer" do
    assert_difference('Consumer.count', -1) do
      delete :destroy, id: @consumer
    end

    assert_redirected_to consumers_path
  end
end
