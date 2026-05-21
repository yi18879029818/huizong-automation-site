import AutomationConsole from "@/components/automation-console";

export const metadata = {
  title: "Internal Automation Console",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InternalAutomationPage() {
  return <AutomationConsole />;
}
