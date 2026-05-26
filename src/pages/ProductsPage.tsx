import OurAddress from './productPage/OurAddress';
import OurBrands from './productPage/OurBrands';
import Products from './productPage/Products';

function ProductsPage() {
	return (
		<div className="container" style={{ padding: '24px 40px' }}>
			<Products />
			<OurBrands />
			<OurAddress />
		</div>
	);
}

export default ProductsPage;
