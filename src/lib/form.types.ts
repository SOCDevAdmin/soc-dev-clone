export type UserProfile = {
	family_name: string | null;
	fire_fighting_experience: number | null;
	fire_trauma: boolean | null;
	first_name: string | null;
	mobile: string | null;
	other_comments: string | null;
	plan_to_leave_before_fire: number | null;
	plan_to_leave_before_flood: number | null;
	residency_profile: number | null;
	rfs_survival_plan: string | null;
	stay_in_touch_choices: number[] | null;
	user_postal_address: UserPostalAddress | null;
	property_profile: UserPropertyProfile;
	community_bcyca_profile: BCYCACommunityProfile | null;
	community_tinonee_profile: TinoneeCommunityProfile | null;
	community_mondrook_profile: MondrookCommunityProfile | null;
	community_external_profile: ExternalCommunityProfile | null;
};

export type BCYCACommunityProfile = {
	bcyca_profile_id: string;
	community_meeting_choices: number[] | null;
	community_workshop_choices: number[] | null;
	information_sheet_choices: number[] | null;
	other_community_meeting: string | null;
	other_community_workshop: string | null;
	other_information_sheet: string | null;
	stay_in_touch_choices: number[] | null;
	will_run_community_workshops: string | null;
	other_comments: string | null;
} | null;

export type TinoneeCommunityProfile = {
	tinonee_profile_id: string;
	community_meeting_choices: number[] | null;
	community_workshop_choices: number[] | null;
	information_sheet_choices: number[] | null;
	other_community_meeting: string | null;
	other_community_workshop: string | null;
	other_information_sheet: string | null;
	stay_in_touch_choices: number[] | null;
	will_run_community_workshops: string | null;
	other_comments: string | null;
} | null;

export type MondrookCommunityProfile = {
	mondrook_profile_id: string;
	community_meeting_choices: number[] | null;
	community_workshop_choices: number[] | null;
	information_sheet_choices: number[] | null;
	other_community_meeting: string | null;
	other_community_workshop: string | null;
	other_information_sheet: string | null;
	stay_in_touch_choices: number[] | null;
	will_run_community_workshops: string | null;
	other_comments: string | null;
} | null;

export type ExternalCommunityProfile = {
	external_profile_id: string;
	community_meeting_choices: number[] | null;
	community_workshop_choices: number[] | null;
	information_sheet_choices: number[] | null;
	other_community_meeting: string | null;
	other_community_workshop: string | null;
	other_information_sheet: string | null;
	stay_in_touch_choices: number[] | null;
	will_run_community_workshops: string | null;
	other_comments: string | null;
} | null;

export type UserPostalAddress = {
	postal_address_street: string;
	postal_address_suburb: string;
	postal_address_postcode: string | null;
} | null;

export interface UserPropertyProfile {
	id: string;
	phone: string | null;
	kyng_area: string;
	have_stortz: string | null;
	number_cats: number | null;
	number_dogs: number | null;
	sign_posted: boolean | null;
	stortz_size: number | null;
	number_birds: number | null;
	residents71_: number | null;
	site_hazards: number[] | null;
	truck_access: number | null;
	other_hazards: string | null;
	residents0_18: number | null;
	property_agent: {
		agent_name: string | null;
		agent_phone: string | null;
		agent_mobile: string | null;
	};
	residents19_50: number | null;
	residents51_70: number | null;
	community_area: string;
	property_rented: boolean | null;
	mobile_reception: number | null;
	number_other_pets: number | null;
	live_stock_present: boolean | null;
	other_site_hazards: string | null;
	land_adjacent_hazard: string | null;
	live_stock_safe_area: string | null;
	vulnerable_residents: boolean | null;
	fire_hazard_reduction: number[] | null;
	other_essential_assets: string | null;
	static_water_available: any[] | null;
	fire_fighting_resources: number[] | null;
	property_address_street: string | null;
	property_address_suburb: string | null;
	property_address_postcode: string | null;
	share_livestock_safe_area: string | null;
	truck_access_other_information: string | null;
}

export type PropertyProfile = UserPropertyProfile;

export type PropertyAgent = {
	agent_name: string | null;
	agent_mobile: string | null;
	agent_phone: string | null;
} | null;