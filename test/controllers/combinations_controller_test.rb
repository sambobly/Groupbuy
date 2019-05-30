require 'test_helper'

class CombinationsControllerTest < ActionController::TestCase
  setup do
    @combination = combinations(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:combinations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create combination" do
    assert_difference('Combination.count') do
      post :create, combination: { complete: @combination.complete, eighta: @combination.eighta, eightb: @combination.eightb, fivea: @combination.fivea, fiveb: @combination.fiveb, foura: @combination.foura, fourb: @combination.fourb, ninea: @combination.ninea, nineb: @combination.nineb, onea: @combination.onea, oneb: @combination.oneb, result: @combination.result, sevena: @combination.sevena, sevenb: @combination.sevenb, sixa: @combination.sixa, sixb: @combination.sixb, tena: @combination.tena, tenb: @combination.tenb, threea: @combination.threea, threeb: @combination.threeb, twoa: @combination.twoa, twob: @combination.twob }
    end

    assert_redirected_to combination_path(assigns(:combination))
  end

  test "should show combination" do
    get :show, id: @combination
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @combination
    assert_response :success
  end

  test "should update combination" do
    patch :update, id: @combination, combination: { complete: @combination.complete, eighta: @combination.eighta, eightb: @combination.eightb, fivea: @combination.fivea, fiveb: @combination.fiveb, foura: @combination.foura, fourb: @combination.fourb, ninea: @combination.ninea, nineb: @combination.nineb, onea: @combination.onea, oneb: @combination.oneb, result: @combination.result, sevena: @combination.sevena, sevenb: @combination.sevenb, sixa: @combination.sixa, sixb: @combination.sixb, tena: @combination.tena, tenb: @combination.tenb, threea: @combination.threea, threeb: @combination.threeb, twoa: @combination.twoa, twob: @combination.twob }
    assert_redirected_to combination_path(assigns(:combination))
  end

  test "should destroy combination" do
    assert_difference('Combination.count', -1) do
      delete :destroy, id: @combination
    end

    assert_redirected_to combinations_path
  end
end
