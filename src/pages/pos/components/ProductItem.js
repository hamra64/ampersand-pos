import { Card, CardBody } from "reactstrap";

import noProduct from "../../../assets/images/products/no-product.png";

const ProductItem = ({product}) => {

	return (
		<Card className="mb-4">
		<div className="card mb-0 product-image-wrapper">
		  <img
			className="card-img-top img-fluid"
			src={
			  product.photo != null
				? product.photo
				: noProduct
			}
			alt={product.name}
		  />
		</div>
		<CardBody>
		  <h5 className="card-title font-size-16">
			{product.name}
		  </h5>
		  <p className="product-price card-text text-muted text-bold font-size-16">
			<span>¢{product.price}</span>
		  </p>
		</CardBody>
	  </Card>
	)
	
}

export default ProductItem;