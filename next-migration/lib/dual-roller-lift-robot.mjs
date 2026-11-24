export const slug = "dual-roller-lift-robot";
export const image = "/products/dual-roller-lift-robot.webp";
export const meta = {
  title: "Dual Roller Lift Robot",
  heroTitle: "Dual Roller Lift Robot",
  label: "Lift and Transfer",
  kicker: "Workstation Material Handling",
  summary: "Mobile tray handling and robotic loading for nameplate laser marking.",
  heroSummary: "From the loading station to the marking fixture and collection box. A mobile base, dual roller decks and a lift bring the nameplates to the arm.",
  image,
  metrics: [
    { value: "Dual", label: "Roller Transfer" },
    { value: "Lift", label: "Height Alignment" },
    { value: "AMR", label: "Mobile Base" }
  ]
};
export const features = [
  { title: "Roller-to-station transfer", description: "Transfer carriers at a workstation interface. Roller direction, carrier guides and handshaking signals are matched to the receiving equipment." },
  { title: "Height alignment", description: "Set the transfer height for the workstation. Lift travel, load limits and mechanical clearances are checked against the actual carrier and layout." },
  { title: "Onboard part handling", description: "Use the robotic arm for part pickup, placement or machine loading. Select the gripper and positioning method for the part geometry." }
];
export const scenarios = ["Workstation Material Handling", "Carrier Transfer", "Machine Loading"];
export const integrations = ["PLC Handshake", "Fleet Dispatch"];
export const configuration = [
  ["Single-level roller payload", "Project-specific configuration"],
  ["Lift stroke and transfer height", "Project-specific configuration"],
  ["Carrier dimensions and roller spacing", "Matched to the carrier"],
  ["Robot arm and gripper", "Selected for the part and reach"],
  ["Overall dimensions and weight", "Confirmed in the project drawing"]
];
export const reference = [
  ["Navigation modes", "AMR free navigation / AGV defined routes"],
  ["Maximum straight-line speed", "1.2 m/s"],
  ["Reference working speed", "0.6 m/s (AMR) / 1.2 m/s (AGV)"],
  ["Station positioning accuracy", "±5 mm"],
  ["Battery configuration", "48 V / 40 Ah / LiFePO4"],
  ["Charging options", "Manual or automatic docking"],
  ["Maximum charging current", "20 A"],
  ["Reference charging time", "Approx. 1.5 h (15–95%)"]
];
