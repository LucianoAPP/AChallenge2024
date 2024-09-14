export interface ApiResponse {
	request_id: string;
	status: string;
}

export interface ProductResponse extends ApiResponse {
	data: ProductResponseData;
}

export interface ProductResponseData {
	products: ProductApi[];
	total_products: null;
	country: string;
	domain: string;
}

export interface Product {
	asin?: string;
	product_title?: string;
	product_price: number;
	product_original_price: number | string;
	currency?: string;
	product_star_rating?: number;
	product_num_ratings?: number;
	product_url?: string;
	product_photo?: string;
	product_num_offers: number;
	product_minimum_offer_price?: Price;
	is_best_seller: boolean;
	is_amazon_choice?: boolean;
	is_prime?: boolean;
	climate_pledge_friendly?: boolean;
	sales_volume: string;
	delivery: string;
	has_variations: boolean;
}
export interface ProductApi {
	asin?: string;
	product_title?: string;
	product_price: string;
	product_original_price: string;
	currency?: string;
	product_star_rating?: string;
	product_num_ratings?: number;
	product_url?: string;
	product_photo?: string;
	product_num_offers: number;
	product_minimum_offer_price?: Price;
	is_best_seller: boolean;
	is_amazon_choice?: boolean;
	is_prime?: boolean;
	climate_pledge_friendly?: boolean;
	sales_volume: string;
	delivery: string;
	has_variations: boolean;
}

interface Price {
	amount: string;
	currency: string;
}

export interface FilterValues {
	search: string;
	minPrice: number;
	maxPrice: number;
	minRating: number;
	maxRating: number;
}
