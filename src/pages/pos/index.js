import { Fragment, useEffect, useMemo, useState } from "react";
import { ArrowLeftCircle, Box, Loader, Search } from "react-feather";
import { Button, Card, CardBody, Col, Nav, NavItem, NavLink, Row } from "reactstrap";
import Select from 'react-select';

import classNames from 'classnames';
// import OwlCarousel from "react-owl-carousel"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import { fetchCategories, fetchProducts } from "../../redux/actions";
import { connect } from "react-redux";

import { categories } from "../../data/categories";
import { products } from "../../data/products";
import OrderedProductItem from "./components/OrderedProductItem";
import CategoryItem from "./components/CategoryItem";
import EmptyState from "../../components/EmptyState";
import ProductItem from "./components/ProductItem";

const Pos = ({ loading }) => {

  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [keyword, setKeyword] = useState(null);
  const [taxRate] = useState(0);

  const [selectedProductList, setSelectedProductList] = useState([]);

  useEffect(() => {
   setProductList(products);
  }, []);

  useEffect(() => {
    if (keyword !== null) {
      setSelectedCategory(null);
    }
    console.log(`Keyword ${keyword}`)
   }, [keyword]);

  // Filter Products based on categories
  var filteredProducts = useMemo(getFilteredList, [selectedCategory, keyword, productList]);

  function getFilteredList() {
    if (!selectedCategory) {
      if (!keyword) {
        return productList;
      } else {
        return productList.filter((product) => {
          // const searchFields =
          //   `${product.name.toLowerCase()} ` +
          //   `${product.description.toLowerCase()}`;
          return product.name.toLowerCase().includes(keyword.toLowerCase());
        });
      }
    }
    return productList.filter((product) => {
      return product.category_id === selectedCategory.product_category_id;
    });
   
  }

  // Calculate Orders
  const { subtotal, tax, total } = useMemo(calculateOrder, [selectedProductList, taxRate])
  function calculateOrder() {
    return selectedProductList.reduce(
      (acc = {}, item = {}) => {
        const itemSubtotal = parseFloat((item.price * item.quantity).toFixed(2));
        const itemTotalTax = parseFloat((itemSubtotal * taxRate).toFixed(2));

        acc.subtotal = parseFloat((acc.subtotal + itemSubtotal).toFixed(2));
        acc.tax = parseFloat((acc.tax + itemTotalTax).toFixed(2));
        acc.total = parseFloat((acc.total + itemSubtotal + itemTotalTax).toFixed(2));
        return acc;
      },
      {
        subtotal: 0.00,
        tax: 0.00,
        total: 0.00,
      }
    );
  }

  function selectProduct(product) {
    // console.log(`product ==> ${JSON.stringify(product)}`);
    if (selectedProductList.filter(it => it.id === product.id).length !== 0) {
      const newSelectedProductList = selectedProductList.map((selectedProduct) => {
        if (selectedProduct.id === product.id) {
          return { ...selectedProduct, quantity: selectedProduct.quantity + 1 };
        } else {
          return selectedProduct;
        }
      });
      // console.log(`newSelectedProductList ==> ${JSON.stringify(newSelectedProductList)}`);
      setSelectedProductList(newSelectedProductList)
    } else {
      setSelectedProductList([...selectedProductList, {...product, quantity: 1}])
    }
  }

  function deleteItem(product) {
    const newList = selectedProductList.filter((item) => item.id !== product.id);
    setSelectedProductList([...newList]);
  }

  function deleteAllSelectedProducts() {
    setSelectedProductList([])
  }

  function getUpdatedQuantity(newProduct) {
    console.log(`getUpdatedQuantity => ${JSON.stringify(newProduct)}`)
    const newList =  selectedProductList.map((selectedProduct) => {
      if (selectedProduct.id === newProduct.id) {
        return { ...selectedProduct, quantity: newProduct.quantity };
      } else {
        return selectedProduct;
      }
    });
    setSelectedProductList(newList)
  }

  return (
    <>
      <div className="mt-4 pb-2 mb-2">
        {/* preloader */}
        {loading && <Loader />}
        <Row>
          <Col lg={8} sm={12}>
            {/* Catergories Tabs */}
            <Nav
              className="category category-no-scroll"
              vertical={false}
              justified
            >
              {/* <OwlCarousel
                className="owl-theme owl-carousel owl-product owl-loaded"
                margin={10}
                items={8}
                nav
                mouseDrag={true}
                touchDrag={true}
                dots={false}
                responsive={{
                  0: { items: 3 },
                  768: { items: 4 },
                  1170: { items: 8 },
                }}
              > */}

              {categories.map((category, index) => {
                return (
                  <NavItem className="mr-2" key={category.id}>
                    <NavLink
                      onClick={() => {
                        setSelectedCategory(category);
                      }}
                      className={classNames({
                        active: selectedCategory === category,
                      })}
                    >
                      <CategoryItem category={category} />
                    </NavLink>
                  </NavItem>
                );
              })}

              {/* </OwlCarousel> */}
            </Nav>

            {/* Search */}
            <form className="product-search mt-4">
              <div className="form-group d-flex align-items-center mb-0">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <Search />
                  </div>
                </div>
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                {/* <button type="button" className="btn btn-primary m-2">
                  Search
                </button> */}
              </div>
            </form>

            {/* Products */}
            <div className="mt-4">
              <Row>
                {filteredProducts.length === 0 &&
                  <EmptyState
                    icon={<Box />}
                    header={""}
                    description={
                      keyword
                        ? `No results for "${keyword}"`
                        : "The store has no products"
                    }
                  />
                }
                {filteredProducts.map((product) => {
                  return (
                    <Fragment key={product.id}>
                      <Col lg={3} sm={6}>
                        <div
                          className=""
                          onClick={() => selectProduct(product)}
                        >
                          <ProductItem product={product} />
                        </div>
                      </Col>
                    </Fragment>
                  );
                })}
              </Row>
            </div>
          </Col>

          {/* Order Tab */}
          <Col lg={4} sm={12}>
            <Card className="order-tab">
              <CardBody>
                <Row>
                  <Col lg={12}>
                    <div className="d-flex flex-column">
                      <Button
                        className="mb-4 w-100"
                        onClick={() => {}}
                        color="outline-primary"
                      >
                        Add a Customer
                      </Button>

                      <Select
                        className="order-type mb-4"
                        options={[
                          { value: "walk-in", label: "Walk-in" },
                          { value: "pick-up", label: "Pick up" },
                          { value: "delivery", label: "Delivery" },
                          { value: "pre-order", label: "Pre-order" },
                        ]}
                        // onChange={}
                      />

                      <div className="total-item d-flex justify-content-between align-items-center">
                        <h4>Total items : {selectedProductList.length}</h4>
                        <Button
                          color="link"
                          onClick={() => {
                            deleteAllSelectedProducts();
                          }}
                          href=""
                        >
                          Clear all
                        </Button>
                      </div>

                      <div className="product-table flex-grow-1 border-top border-bottom border-secondary my-2">
                        {selectedProductList.length === 0 && (
                          <EmptyState
                            icon={<ArrowLeftCircle />}
                            header={""}
                            description={"Select Product(s) to begin"}
                          />
                        )}
                        <ul className="p-0">
                          {selectedProductList.map((product) => {
                            return (
                              <OrderedProductItem
                                key={product.id}
                                product={product}
                                deleteProduct={deleteItem}
                                onQuantityChange={getUpdatedQuantity}
                              />
                            );
                          })}
                        </ul>
                      </div>

                      <div className="order-totals pt-2 flex-shrink-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <p>Discount</p>
                          <p>0.00</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <p>Subtotal</p>
                          <p>¢{subtotal}</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <p>Tax</p>
                          <p>{tax}</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center border-top border-secondary">
                          <h5>Total</h5>
                          <h5>¢{total}</h5>
                        </div>
                      </div>

                      <Button className="w-100">Submit Order</Button>
                    </div>
                  </Col>

                  {/* <div className="d-flex flex-column">
                  </div> */}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { categories, products, loading, error } = state.Pos;
  return { categories, products, loading, error };
};

export default connect(mapStateToProps, { fetchCategories, fetchProducts }) (
  Pos
);
// export default Pos;
