import { createFileRoute } from "@tanstack/react-router";
import { LogicGateSimulator } from "@gately/ui/components/simulator/simulator";

export const Route = createFileRoute("/editor")({
	component: EditorPage,
});

function EditorPage() {
	return (
		<main className="min-h-screen bg-background">
			<LogicGateSimulator />
		</main>
	);
}
