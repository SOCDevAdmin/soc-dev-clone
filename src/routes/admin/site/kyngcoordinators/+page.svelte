<script lang="ts">
	import type { PageData } from './$types';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';

	//TODO: Refactor this route to manage KYNG coordinators
	let { data }: { data: PageData } = $props();

	const value = $state(['']);
</script>

<svelte:head>
	<title>Site Admin-KYNG Coordinators</title>
</svelte:head>

<Accordion spaceY="space-y-1" {value} collapsible={true}>
	<Accordion.Item value="0" classes="bg-orange-100 font-medium">
		{#snippet control()}Current KYNG Coordinators{/snippet}
		{#snippet panel()}
			<p>Current KYNG coordinators</p>
		{/snippet}
	</Accordion.Item>
	<Accordion.Item value="1" classes="bg-orange-100 font-medium">
		{#snippet control()}Add KYNG Coordinator{/snippet}
		{#snippet panel()}
			<p>Add KYNG coordinator</p>
		{/snippet}
	</Accordion.Item>
	<Accordion.Item value="2" classes="bg-orange-100 font-medium">
		{#snippet control()}Revoke KYNG Coordinator{/snippet}
		{#snippet panel()}
			<p>Revoke KYNG coordinator</p>
		{/snippet}
	</Accordion.Item>
</Accordion>
