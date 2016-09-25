class Api::EventsController < Api::ApplicationController
  def index
    render json: Event.order(sort_by + ' ' + order)
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event
    else
      render nothing: true, status: :bad_request
    end
  end

  def update
    if event.update(event_params)
      render json: event
    else
      render nothing: true, status: :unprocessable_entity
    end
  end

  def destroy
    event.destroy
    head :no_content
  end

  def search
    query = params[:query]
    events = Event.where('name LIKE ? OR place LIKE ? OR description LIKE ?',
                         "%#{query}%", "%#{query}%", "%#{query}%").ordered
    render json: events
  end

  private

  def event_params
    params.require(:event).permit(:name, :description, :event_date, :place)
  end

  def event
    return @event if defined?(@event)
    @event = Event.find(params[:id])
  end

  def sort_by
    %w(name place description event_date).include?(params[:sort_by]) ? params[:sort_by] : 'name'
  end

  def order
    %w(asc desc).include?(params[:order]) ? params[:order] : 'desc'
  end
end