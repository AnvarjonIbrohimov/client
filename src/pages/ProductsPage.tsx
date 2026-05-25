import { useProducts } from '../hooks/useProducts';

function ProductsPage() {
	const { data, isLoading, error } = useProducts();

	console.log(data);
	console.log(error);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error...</div>;
	}

	return (
		<div className="p-10">
			<h1 className="mb-6 text-4xl font-bold">Products</h1>

			<div className="grid grid-cols-4 gap-6">
				{data?.map((product: any) => (
					<div key={product._id} className="rounded-xl border p-4">
						{product.productImages?.[0] && (
							<img
								src={`http://localhost:3009${product.productImages[0]}`}
								alt={product.productName}
								className="mb-4 h-52 w-full rounded-lg object-cover"
							/>
						)}

						<h2 className="text-xl font-semibold">{product.productName}</h2>

						<p className="mt-2 text-lg font-bold text-purple-600">${product.productPrice}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default ProductsPage;
