class Profile < ActiveRecord::Base
  belongs_to :user

  def self.age_range
    for num in 1..100
      num
    end
  end

end
