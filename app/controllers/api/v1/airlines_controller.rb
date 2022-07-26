class Api::V1::AirlinesController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    airlines = Airline.includes(:reviews).all

    render json: airlines, include: [:reviews], methods: [:avg_score]
  end

  def create
    airline = Airline.new(airline_params)

    if airline.save
      render json: airline
    else
      render json: { error: airline.errors.messages }, status: :unprocessable_entity
    end
  end

  def update
    airline = Airline.find_by(slug: params[:slug])

    if airline.update(airline_params)
      render json: airline, include: [:reviews]
    else
      render json: { error: airline.errors.messages }, status: :unprocessable_entity
    end
  end

  def show
    airline = Airline.find_by(slug: params[:slug])

    if airline
      render json: airline, include: [:reviews], methods: [:avg_score]
    else
      head :not_found
    end
  end

  def destroy
    airline = Airline.find_by(slug: params[:slug])

    if airline.destroy
      head :no_content
    else
      render json: { error: airline.errors.messages }, status: :unprocessable_entity
    end
  end

  private

  def airline_params
    params.require(:airline).permit(:name, :image_url)
  end
end
