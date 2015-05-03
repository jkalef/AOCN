class Admin::CategoriesController < Admin::BaseController

  def index
    @categories = Category.all
  end

  def new
    @category = Category.new
    @category.items.build
  end

  def create
    @category = Category.new(category_params)
    @category.save
    render nothing: true
  end

  def edit
    @category = Category.find(params[:id])
    @category.items.build
  end


  def update
    @category = Category.find(params[:id])
    @category.update(category_params)
    render nothing: true
  end


  private

  def category_params
    params.require(:category).permit(:name, {items_attributes: item_attributes_params})
  end

  def item_attributes_params
    [:title, :picture, :_destroy]
  end

end