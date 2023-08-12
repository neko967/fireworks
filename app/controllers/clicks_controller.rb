class ClicksController < ApplicationController
  def create
    click_count = params[:click_count].to_i
    Click.create(count: click_count)
    render json: { message: 'Click count saved successfully' }
  end
end
