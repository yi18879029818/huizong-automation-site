const ICONS = {
  airport_shuttle: (
    <>
      <rect x="4" y="6.5" width="16" height="9" rx="2.5" />
      <path d="M7 15.5v2.5M17 15.5v2.5M7 10h10" />
      <circle cx="8" cy="18.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="18.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  arrow_forward: <path d="M5 12h13m-5-5 5 5-5 5" />,
  arrow_right_alt: <path d="M4.5 12h14m-4.8-4.6L18 12l-4.3 4.6" />,
  biotech: (
    <>
      <path d="M10 4.5v5.2l-3.8 6.2A2.2 2.2 0 0 0 8 19.5h8a2.2 2.2 0 0 0 1.8-3.6L14 9.7V4.5" />
      <path d="M9 4.5h6M8.8 14h6.4M9.7 11.5h4.6" />
    </>
  ),
  chat: (
    <>
      <path d="M5.5 6.5h13a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8l-4 3v-3h-1a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
      <path d="M8.5 11.5h7M8.5 14.5h4.5" />
    </>
  ),
  chevron_left: <path d="m14.5 6.5-5 5 5 5" />,
  chevron_right: <path d="m9.5 6.5 5 5-5 5" />,
  construction: (
    <>
      <path d="m14.5 5.5 4 4" />
      <path d="m13 7 4 4" />
      <path d="m5.5 18.5 6.2-6.2" />
      <path d="m4.8 15.8 3.4 3.4" />
      <path d="m15.5 4.5 4 4-1.7 1.7-4-4Z" />
    </>
  ),
  conveyor_belt: (
    <>
      <rect x="4.5" y="8" width="15" height="6.5" rx="2.4" />
      <path d="M7 14.5v2M17 14.5v2" />
      <circle cx="8" cy="18" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="18" r="1.1" fill="currentColor" stroke="none" />
      <path d="M8 11.2h8" />
    </>
  ),
  description: (
    <>
      <path d="M8 4.5h6l4 4v10a1.8 1.8 0 0 1-1.8 1.8H8a1.8 1.8 0 0 1-1.8-1.8V6.3A1.8 1.8 0 0 1 8 4.5Z" />
      <path d="M14 4.5v4h4M9 12h6M9 15.5h6" />
    </>
  ),
  directions_car: (
    <>
      <path d="M7.5 8 9 5.8h6L16.5 8" />
      <path d="M5.5 8h13l1.2 4.4v3.1a1 1 0 0 1-1 1h-1.2a1 1 0 0 1-1-1V15H7.5v.5a1 1 0 0 1-1 1H5.3a1 1 0 0 1-1-1v-3.1Z" />
      <circle cx="8" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  gavel: (
    <>
      <path d="m10 7 4.6 4.6M8.8 8.2l4.6 4.6M14.8 5.2l4 4-2.2 2.2-4-4Z" />
      <path d="m13.8 12.2-7.3 7.3M5 19h7" />
    </>
  ),
  hub: (
    <>
      <circle cx="12" cy="6.2" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="7" cy="16.2" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="17" cy="16.2" r="1.7" fill="currentColor" stroke="none" />
      <path d="M12 7.9v4.1M12 12l-4 2.8M12 12l4 2.8" />
    </>
  ),
  inventory_2: (
    <>
      <path d="M4.8 8.5 12 4.8l7.2 3.7-7.2 3.7-7.2-3.7Z" />
      <path d="M6 10.2v6.5L12 20l6-3.3v-6.5" />
      <path d="M12 12.2v7.6" />
    </>
  ),
  local_shipping: (
    <>
      <path d="M4.5 7.5h9v7h-9Z" />
      <path d="M13.5 10h3l2 2v2.5h-5Z" />
      <circle cx="8" cy="17.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="17.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  location_on: (
    <>
      <path d="M12 20c3.5-4.4 5.2-7.2 5.2-9.4A5.2 5.2 0 1 0 6.8 10.6C6.8 12.8 8.5 15.6 12 20Z" />
      <circle cx="12" cy="10.3" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
  mail: (
    <>
      <rect x="4" y="6.5" width="16" height="11" rx="2.4" />
      <path d="m5.5 8 6.5 5 6.5-5" />
    </>
  ),
  medical_services: (
    <>
      <rect x="5.2" y="6" width="13.6" height="12.5" rx="2.6" />
      <path d="M12 9v6M9 12h6" />
    </>
  ),
  memory: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.8" />
      <path d="M9.5 9.5h5v5h-5ZM9 4.5v2M12 4.5v2M15 4.5v2M9 17.5v2M12 17.5v2M15 17.5v2M4.5 9h2M4.5 12h2M4.5 15h2M17.5 9h2M17.5 12h2M17.5 15h2" />
    </>
  ),
  monitoring: (
    <>
      <path d="M5 6.5h14v11H5Z" />
      <path d="m7.5 14 2.3-2.6 2.2 1.8 3.2-4.2 1.3 1.6" />
    </>
  ),
  phone_in_talk: (
    <>
      <path d="M7 5.2h2.3l1.4 4.1-1.8 1.7a13 13 0 0 0 4.2 4.2l1.7-1.8 4.1 1.4V17c0 .8-.6 1.4-1.4 1.4h-.8A11.6 11.6 0 0 1 5.6 7.4v-.8c0-.8.6-1.4 1.4-1.4Z" />
      <path d="M14.5 6.5a4.5 4.5 0 0 1 3 3M14.5 3.8a7.5 7.5 0 0 1 5.7 5.7" />
    </>
  ),
  precision_manufacturing: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 5.2v2.1M12 16.7v2.1M18.8 12h-2.1M7.3 12H5.2M16.8 7.2l-1.5 1.5M8.7 15.3l-1.5 1.5M16.8 16.8l-1.5-1.5M8.7 8.7 7.2 7.2" />
    </>
  ),
  restaurant: (
    <>
      <path d="M8.2 4.8v7.7M6.5 4.8v4.4M9.9 4.8v4.4M6.5 9.2h3.4M15 4.8c1.8 1.7 1.8 6.2 0 7.9M15 12.7v6.5" />
    </>
  ),
  settings_input_component: (
    <>
      <rect x="4.5" y="6.5" width="15" height="11" rx="2.6" />
      <path d="M8 10.2h8M8 13.8h5" />
      <circle cx="15.8" cy="13.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  shopping_bag: (
    <>
      <path d="M7.2 8.5h9.6l-.9 10.2H8.1L7.2 8.5Z" />
      <path d="M9.5 8.5a2.5 2.5 0 0 1 5 0" />
    </>
  ),
  toys: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2.2" />
      <path d="M12 7v10M7 12h10" />
    </>
  ),
  verified: (
    <>
      <path d="M12 4.8 18 7v4.6c0 3.1-2 5.9-6 7.6-4-1.7-6-4.5-6-7.6V7Z" />
      <path d="m9.3 12 1.8 1.8 3.7-3.7" />
    </>
  ),
  workspace_premium: (
    <>
      <circle cx="12" cy="10" r="4.6" />
      <path d="m12 7.7.8 1.6 1.8.3-1.3 1.3.3 1.8-1.6-.8-1.6.8.3-1.8-1.3-1.3 1.8-.3ZM9.4 14.5 8 19l4-2 4 2-1.4-4.5" />
    </>
  )
};

export function InlineIcon({ className = "", name }) {
  const glyph = ICONS[name];

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
    >
      {glyph || <circle cx="12" cy="12" r="7" />}
    </svg>
  );
}
