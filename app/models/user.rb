class User < ActiveRecord::Base
  has_secure_password

  has_one :profile, dependent: :destroy

  has_many :compares, dependent: :destroy
  has_many :items_compared, through: :compares, source: :item

  has_many :chosen_items, dependent: :destroy, 
              class_name: 'Compare', foreign_key: :chosen_item_id
  has_many :unchosen_items, dependent: :destroy,
              class_name: 'Compare', foreign_key: :unchosen_item_id

  has_many :likes, dependent: :destroy
  has_many :liked_items, through: :likes, source: :item

  validates :email, presence: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, 
                              :on => :create

  before_create :generate_api_key
  before_create :create_profile

  #will use this for mobile logins to track current_user
  #in the react native piece of the application
  def generate_api_key
    begin
      self.api_key = SecureRandom.hex
    end while User.exists?(api_key: api_key)
  end

  #instantiate a new profile when a user is created
  def create_profile
    self.profile = Profile.create
  end

end
