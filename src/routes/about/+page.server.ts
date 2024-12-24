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
		projectAddressPointData: projectAddressPointData ?? [],
		session: null,
		user: null,
		userRoles: null,
		permissions: null,
		coordinatesKYNG: null,
		propertyIds: null,
		userProfile: null,
		optionsData: {
			userOptionsData: { object_names: [] },
			communityBCYCAOptionsData: { object_names: [] },
			communityExternalOptionsData: { object_names: [] },
			communityTinoneeOptionsData: { object_names: [] },
			communityMondrookOptionsData: { object_names: [] }
		}
	};
};
