import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../../../../../packages/ui/src";

export const Route = createFileRoute("/demo/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Button>Halo button</Button>
		</div>
	);
}
