import ActiveUsers from './homepage/ActiveUsers';
import Clothes from './homepage/Clothes';
import Electronics from './homepage/Electronics';
import Fotos from './homepage/Fotos';
import Books from './homepage/Books';
import Advertisement from './homepage/Advertisement';

function HomePage() {
	return (
		<div className="text-4xl font-bold">
			<Fotos />
			<Clothes />
			<Books />
			<Electronics />
			<Advertisement />
			<ActiveUsers />
		</div>
	);
}

export default HomePage;
