import { getUserPermissions } from '$lib/server/auth/utility';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
	locals: { supabase, getSessionAndUser },
	cookies
}) => {
	const { session, user, userRoles, coordinatesKYNG } = await getSessionAndUser();
	let permissions;
	if (!session) {
		return {
			session: null,
			user: null,
			userRoles: null,
			permissions: null,
			coordinatesKYNG: null
		};
	}

	if (session && user && userRoles) {
		permissions = await getUserPermissions(supabase, user.id, userRoles);
		console.log('Permissions:', permissions);
	}

	// TODO: Need to handle CommunityRequestOptions
	// const getCommunityRequestOptions = async () => {
	// 	const { data, error: requestError } = await supabase.from('community_request_options_lut')
	// 		.select(`
	// 			index_value,
	// 			lable,
	// 			community_request_options_concordance!public_community_request_options_lut_concordance_fkey (
	// 			table_name,
	// 			object_name,
	// 			field_name
	// 			)
	// 		`);

	// 	if (requestError) {
	// 		console.error('Failed to fetch community request options:', requestError);
	// 		error(400, `Failed to fetch community request options: ${requestError.message}`);
	// 	}
	// 	return ((data as unknown as SupabaseResponse[]) || []).map((item) => ({
	// 		index_value: item.index_value,
	// 		lable: item.lable,
	// 		community_request_options_concordance: item.community_request_options_concordance
	// 	})) as CommunityRequestOption[];
	// };
	// const communityRequestOptions: CommunityRequestOption[] = await getCommunityRequestOptions();

	return {
		session,
		cookies: cookies.getAll(),
		user,
		userRoles,
		permissions,
		coordinatesKYNG
	};
};
