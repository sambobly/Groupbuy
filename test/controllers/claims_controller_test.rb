require 'test_helper'

class ClaimsControllerTest < ActionController::TestCase
  setup do
    @claim = claims(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:claims)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create claim" do
    assert_difference('Claim.count') do
      post :create, claim: { account: @claim.account, bsb: @claim.bsb, complete: @claim.complete, consumer_id: @claim.consumer_id, email: @claim.email, merchandise_id: @claim.merchandise_id, mobile: @claim.mobile }
    end

    assert_redirected_to claim_path(assigns(:claim))
  end

  test "should show claim" do
    get :show, id: @claim
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @claim
    assert_response :success
  end

  test "should update claim" do
    patch :update, id: @claim, claim: { account: @claim.account, bsb: @claim.bsb, complete: @claim.complete, consumer_id: @claim.consumer_id, email: @claim.email, merchandise_id: @claim.merchandise_id, mobile: @claim.mobile }
    assert_redirected_to claim_path(assigns(:claim))
  end

  test "should destroy claim" do
    assert_difference('Claim.count', -1) do
      delete :destroy, id: @claim
    end

    assert_redirected_to claims_path
  end
end
