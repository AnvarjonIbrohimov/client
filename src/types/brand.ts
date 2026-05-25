// ─── Types ────────────────────────────────────────────────────────────────────
export interface SocialLinks {
	instagram?: string;
	facebook?: string;
	telegram?: string;
}

export interface Brand {
  _id: string;
  brandName: string;
  brandLogo: string;
  brandAddress: string;
  brandPhone: string;
  brandEmail: string;
  workingHours: string;
  socialLinks: SocialLinks;
}