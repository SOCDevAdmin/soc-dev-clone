import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: projectAddressPointData, error: addressPointError } = await supabase.rpc(
		'get_addresspoints_geojson'
	);

	if (addressPointError) {
		console.error('Failed to fetch address points:', addressPointError.message);
		throw error(500, 'Failed to load address points data');
	}

	return {
		projectAddressPointData: projectAddressPointData ?? []
	};
};
