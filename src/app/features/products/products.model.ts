import { Product, ProductApi } from './product.types';

export const mappingProduct = (result: ProductApi | ProductApi[]): Product | Product[] => {
	if (!result) {
		return [];
	}

	if (Array.isArray(result)) {
		const valueReturned: Product[] = result.map((Data) => {
			return {
				asin: Data.asin,
				product_title: Data.product_title,
				product_price:
					Data.product_price != null && !isNaN(parseFloat(Data.product_price.replace('$', '')))
						? parseFloat(Data.product_price.replace('$', ''))
						: 0,
				product_original_price:
					Data.product_original_price != null &&
					!isNaN(parseFloat(Data.product_original_price.replace('$', '')))
						? parseFloat(Data.product_original_price.replace('$', ''))
						: 0,
				currency: Data.currency,
				product_star_rating:
					Data.product_star_rating != null && !isNaN(parseFloat(Data.product_star_rating))
						? parseFloat(Data.product_star_rating)
						: 0,
				product_num_ratings: Data.product_num_ratings,
				product_url: Data.product_url,
				product_photo: Data.product_photo,
				product_num_offers: Data.product_num_offers,
				product_minimum_offer_price: Data.product_minimum_offer_price,
				is_best_seller: Data.is_best_seller,
				is_amazon_choice: Data.is_amazon_choice,
				is_prime: Data.is_prime,
				climate_pledge_friendly: Data.climate_pledge_friendly,
				sales_volume: Data.sales_volume,
				delivery: Data.delivery,
				has_variations: Data.has_variations
			};
		});
		return valueReturned;
	} else {
		const valueReturned: Product = {
			asin: result.asin,
			product_title: result.product_title,
			product_price:
				result.product_price != null && !isNaN(parseFloat(result.product_price.replace('$', '')))
					? parseFloat(result.product_price.replace('$', ''))
					: 0,
			product_original_price:
				result.product_original_price != null &&
				!isNaN(parseFloat(result.product_original_price.replace('$', '')))
					? parseFloat(result.product_original_price.replace('$', ''))
					: 0,
			currency: result.currency,
			product_star_rating:
				result.product_star_rating != null && !isNaN(parseFloat(result.product_star_rating))
					? parseFloat(result.product_star_rating)
					: 0,
			product_num_ratings: result.product_num_ratings,
			product_url: result.product_url,
			product_photo: result.product_photo,
			product_num_offers: result.product_num_offers,
			product_minimum_offer_price: result.product_minimum_offer_price,
			is_best_seller: result.is_best_seller,
			is_amazon_choice: result.is_amazon_choice,
			is_prime: result.is_prime,
			climate_pledge_friendly: result.climate_pledge_friendly,
			sales_volume: result.sales_volume,
			delivery: result.delivery,
			has_variations: result.has_variations
		};

		return valueReturned;
	}
};
