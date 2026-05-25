import '../../css/home/Books.css';

function Books() {
	const books = [
		{
			id: 1,
			name: 'Atomic Habits',
			image: '/images/banner4.jpg',
			description: 'A guide to building good habits and breaking bad ones.',
		},
		{
			id: 2,
			name: 'Deep Work',
			image: '/images/banner5.jpg',
			description: 'Rules for focused success in a distracted world.',
		},
		{
			id: 3,
			name: 'Clean Code',
			image: '/images/banner1.jpg',
			description: 'A handbook of agile software craftsmanship.',
		},
		{
			id: 4,
			name: 'The Pragmatic Programmer',
			image: '/images/banner2.jpg',
			description: 'Your journey to mastery.',
		},
		{
			id: 5,
			name: 'The Pragmatic Programmer',
			image: '/images/banner3.jpg',
			description: 'Your journey to mastery.',
		},
	];

	return (
		<div className="books-page">
			<h1 className="title">Books Collection</h1>

			<div className="book-grid">
				{books.map((b) => (
					<div key={b.id} className="book-card">
						<div className="image-box">
							<img src={b.image} alt={b.name} />

							<div className="icons">
								<span className="icon">♥</span>
								<span className="icon">👁</span>
							</div>
						</div>

						<div className="content">
							<h3>{b.name}</h3>
							<p>{b.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Books;
