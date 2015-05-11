class Profile < ActiveRecord::Base
  belongs_to :user

  def self.age_range
    for num in 1..100
      num
    end
  end

  def self.gender_select
    ["male", "female"]
  end

  def self.location_range
    ["Vancouver", "Toronto", "Montreal", "Halifax"]
  end

  # def self.find_specific_users
  #   specific_users = []
  #   profiles = Profile.where(sex: "male")
  #   profiles.each do |profile|
  #     specific_users << profile.user.id
  #   end
  #   specific_users
  # end

end
