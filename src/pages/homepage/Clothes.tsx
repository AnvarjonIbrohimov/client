import '../../css/home/Clothes.css';

function Clothes() {
	const products = [
		{
			id: 1,
			name: 'Classic Men Jacket',
			category: 'Men',
			image: '/images/banner1.jpg',
			description: 'Warm and stylish winter jacket for men.',
		},
		{
			id: 2,
			name: 'Women Fashion Dress',
			category: 'Women',
			image: '/images/banner2.jpg',
			description: 'Elegant dress for special occasions.',
		},
		{
			id: 3,
			name: 'Kids Hoodie',
			category: 'Kids',
			image: '/images/banner3.jpg',
			description: 'Soft and comfortable hoodie for kids.',
		},
		{
			id: 4,
			name: 'Street Style Outfit',
			category: 'Men',
			image: '/images/banner4.jpg',
			description: 'Modern streetwear outfit.',
		},
		{
			id: 5,
			name: 'Summer Women Style',
			category: 'Women',
			image: '/images/banner5.jpg',
			description: 'Light and breathable summer outfit.',
		},
	];

	return (
		<div className="clothes-page">
			<h1 className="title">Clothes Collection</h1>

			<div className="product-grid">
				{products.map((p) => (
					<div key={p.id} className="product-card">
						<div className="image-box">
							<img src={p.image} alt={p.name} />

							<span className="badge">{p.category}</span>
						</div>

						<div className="content">
							<h3>{p.name}</h3>
							<p>{p.description}</p>

						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Clothes;
