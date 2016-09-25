class Event < ApplicationRecord
  # Scopes
  scope :ordered, -> { order(created_at: 'desc') }
end
