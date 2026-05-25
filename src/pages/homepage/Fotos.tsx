import '../../css/home/Fotos.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';

function Fotos() {
	const images = ['/images/banner1.jpg', '/images/banner2.jpg', '/images/banner3.jpg', '/images/banner4.jpg'];

	return (
		<div className="fotos-screen">
			<Swiper
				modules={[Autoplay, Pagination]}
				autoplay={{ delay: 3000 }}
				pagination={{ clickable: true }}
				loop={true}
				className="swiper-container"
			>
				{images.map((img, i) => (
					<SwiperSlide key={i} className="swiper-slide">
						<img src={img} alt={`slide-${i}`} className="slide-image" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default Fotos;
