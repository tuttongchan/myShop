import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
  const { product } = props;
  
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <div className="card-image-body">
          <img className="medium" src={product.image} alt={product.name} />
        </div>
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <div>
            <h2 className="card-heading">{product.name}</h2>
            <h2 className="card-heading">{product.description}</h2>
            <h3 className="card-heading">${product.price}</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
