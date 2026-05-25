import '../../css/home/Advantisement.css';

function Advertisement() {
	return (
		<div className="advertisement">
			<video autoPlay loop muted playsInline className="ad-video">
				<source src="/videos/smart-store.mp4" type="video/mp4" />
			</video>
		</div>
	);
}

export default Advertisement;
