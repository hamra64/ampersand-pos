import QuantityPicker from "../../../components/QuantityPicker/QuantityPicker";
import { Trash } from 'react-feather';
import { Fragment } from "react";
import noProductImage from "../../../assets/images/products/no-product.png";
import { Button } from "reactstrap";

const OrderedProductItem = ({product, deleteProduct, onQuantityChange}) => {

	const handleQuantityChange = (value) => {
		const newProduct = {...product, quantity: value}
		onQuantityChange(newProduct)
	}

	return (
	  <Fragment key={product.id}>
		<li className="product-lists">
		  <div className="d-flex align-items-center">
			<div className="flex-shrink-0">
			  <div className="product-image">
				<div className="product-images">
				  <img
					src={product.photo != null ? product.photo : noProductImage}
					alt={product.name}
				  />
				</div>
			  </div>
			</div>
  
			<div className="flex-grow-1 ms-3">
			  <div className="product-content">
				<h4 className="m-0">{product.name}</h4>
				<div className="product-sku">
				  <span>{product.id}</span>
				</div>
				<QuantityPicker value={product.quantity} min={1} onChange={handleQuantityChange} />
			  </div>
			</div>
  
			<div className="d-flex align-items-center flex-shrink">
			  <p className="product-price mb-0">
			  <span>¢{product.price}</span>
			  </p>
				<Button color="" className="confirm-text" onClick={() => {deleteProduct(product)}}>
					<Trash color="#000"/>
				</Button>
			</div>
		  </div>
		</li>
	  </Fragment>
	);
  }

  export default OrderedProductItem;