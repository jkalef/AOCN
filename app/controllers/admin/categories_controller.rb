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
    redirect_to admin_categories_path
  end

  def edit
    @category = Category.find(params[:id])
    @category.items.build
  end


  def update
    @category = Category.find(params[:id])
    @category.update(category_params)
    redirect_to admin_categories_path, notice: "category updated!"
  end


  private

  def category_params
    params.require(:category).permit(:name, {items_attributes: item_attributes_params})
  end

  def item_attributes_params
    [:id, :title, :picture, :_destroy]
  end

end