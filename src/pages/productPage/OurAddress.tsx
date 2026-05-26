import '../../css/products/OurAddress.css';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ADDRESS = {
	name: 'SMART-STORE Main Office',
	street: '123 Teheran-ro, Gangnam-gu',
	city: 'Seoul, South Korea',
	phone: '+82-2-1234-5678',
	email: 'contact@smartstore.kr',
	workingHours: 'Mon–Fri: 09:00–18:00',
	weekend: 'Sat: 10:00–15:00 | Sun: Closed',
	mapSrc:
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4!2d127.0276!3d37.4979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15704e4b9e9%3A0x7b650f2b5d4b3c4a!2sGangnam-gu%2C%20Seoul%2C%20South%20Korea!5e0!3m2!1sen!2skr!4v1700000000000',
};
function OurAddress() {
	return (
		<section className="our-address">
			{/* ── Section title ── */}
			<div className="our-address__header">
				<h2 className="our-address__title">Our Address</h2>
			</div>

			{/* ── Map ── */}
			<div className="our-address__map-wrap">
				<iframe
					src={ADDRESS.mapSrc}
					className="our-address__map"
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					title="Store location"
				/>
				{/* Overlay badge */}
				<div className="our-address__map-badge">
					<span className="our-address__map-badge-dot" />
					{ADDRESS.name}
				</div>
			</div>

			{/* ── Info row ── */}
			<div className="our-address__info">
				<div className="our-address__info-card">
					{/* Address */}
					<span className="our-address__info-icon">
						<MapPin size={18} strokeWidth={1.8} />
					</span>
					<div>
						<p className="our-address__info-label">Address</p>
						<p className="our-address__info-value">{ADDRESS.street}</p>
						<p className="our-address__info-value our-address__info-value--muted">{ADDRESS.city}</p>
					</div>
				</div>

				<div className="our-address__divider" />

				<div className="our-address__info-card">
					{/* Phone */}
					<span className="our-address__info-icon">
						<Phone size={18} strokeWidth={1.8} />
					</span>
					<div>
						<p className="our-address__info-label">Phone</p>
						<a href={`tel:${ADDRESS.phone}`} className="our-address__info-value our-address__info-value--link">
							{ADDRESS.phone}
						</a>
					</div>
				</div>

				<div className="our-address__divider" />

				<div className="our-address__info-card">
					{/* Email */}
					<span className="our-address__info-icon">
						<Mail size={18} strokeWidth={1.8} />
					</span>
					<div>
						<p className="our-address__info-label">Email</p>
						<a href={`mailto:${ADDRESS.email}`} className="our-address__info-value our-address__info-value--link">
							{ADDRESS.email}
						</a>
					</div>
				</div>

				<div className="our-address__divider" />

				<div className="our-address__info-card">
					{/* Working Hours */}
					<span className="our-address__info-icon">
						<Clock size={18} strokeWidth={1.8} />
					</span>
					<div>
						<p className="our-address__info-label">Working Hours</p>
						<p className="our-address__info-value">{ADDRESS.workingHours}</p>
						<p className="our-address__info-value our-address__info-value--muted">{ADDRESS.weekend}</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default OurAddress;
