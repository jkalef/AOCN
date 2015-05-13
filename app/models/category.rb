class Category < ActiveRecord::Base
  has_many :items, dependent: :destroy

  validates :name, presence: true, uniqueness: true

  # def self.select_box_options
  #   Category.all.collect { |c| [c.topic, c.id] }
  # end

  accepts_nested_attributes_for :items, reject_if: 
      lambda{ |x| x[:title].blank? && x[:name].blank? }, allow_destroy: true

  validates :items, presence: true

  def self.category_names
    names = []
    Category.all.each do |category|
      names << category.name
    end
    names
  end
end
