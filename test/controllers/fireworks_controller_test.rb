require "test_helper"

class FireworksControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get fireworks_show_url
    assert_response :success
  end
end
