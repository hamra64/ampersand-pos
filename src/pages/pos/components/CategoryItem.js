import categoryNoPhoto from "../../../assets/images/categories/category-no-image.png";

const CategoryItem = ({ category }) => {
  return (
    <div className="category">
        {category.photo !== null && (
            <img
              height="30px"
              src={category.photo ? category.photo : categoryNoPhoto}
              alt={category.name}
            />
          )}
          {category.color_code && category.photo === null && (
            <div
              className="category-icon-size category-no-photo"
            ></div>
          )}
          <h6>{category.name}</h6>
    </div>
  );
};

export default CategoryItem;
