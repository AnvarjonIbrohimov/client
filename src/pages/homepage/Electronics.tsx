import '../../css/home/Electronics.css';

function Electronics() {
	const products = [
		{
			id: 1,
			name: 'iPhone 15 Pro',
			image: '/images/banner5.jpg',
			description: 'Latest Apple smartphone with A17 chip.',
		},
		{
			id: 2,
			name: 'MacBook Air M2',
			image: '/images/banner1.jpg',
			description: 'Lightweight and powerful laptop.',
		},
		{
			id: 3,
			name: 'Samsung Galaxy S24',
			image: '/images/banner2.jpg',
			description: 'Flagship Android smartphone.',
		},
		{
			id: 4,
			name: 'AirPods Pro',
			image: '/images/banner3.jpg',
			description: 'Noise cancelling wireless earbuds.',
		},
		{
			id: 5,
			name: 'Apple Watch',
			image: '/images/banner4.jpg',
			description: 'Smart watch for health and fitness.',
		},
	];

	return (
		<div className="electronics-page">
			<h1 className="title">Electronics</h1>

			<div className="electronics-grid">
				{products.map((p) => (
					<div key={p.id} className="electronics-card">
						<div className="image-box">
							<img src={p.image} alt={p.name} />

							<div className="icons">
								<span className="icon">♥</span>
								<span className="icon">👁</span>
							</div>
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

export default Electronics;
