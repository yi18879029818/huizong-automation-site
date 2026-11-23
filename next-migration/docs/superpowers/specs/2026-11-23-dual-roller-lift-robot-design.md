# Dual Roller Lift Robot product addition

## User-authorized scope

Add a product card to the existing product overview and a standalone detail page. Use the supplied `D:/展会项目/untitled.155.png` without changing the machine geometry. The user confirms its structure differs from the Corlink reference and requests broadly similar parameters. Maintain the existing Coolyne visual style and support English, French, German and Spanish.

## Proposed presentation

- English name: Dual Roller Lift Robot.
- Route: `/products/dual-roller-lift-robot`, with corresponding localized routes.
- Add a product-navigation entry and overview card linking to the detail page.
- Detail sections: product image and introduction, material-transfer applications, reference configuration, project-specific roller/lift interface requirements, engineering inquiry link.
- Use the supplied render as the product image. Preserve the visible manipulator, enclosure, transfer hardware and mobile chassis. Prepare an optimized image without generative changes.
- Reuse the current catalog shell and styling. A separate product family or a new layout is unnecessary for this addition.

## Parameter evidence

Reference URL: https://www.corlink.cn/ProductDetail?id=51&from=6
Its public product API returns model COR-i5M, a composite mobile robot, rather than a dual roller lift robot.

Potential reference configuration values, subject to the user's confirmation of applicability:

| Field | Reference configuration |
| --- | --- |
| Navigation | AMR free navigation and AGV defined-route operation |
| Maximum straight-line speed | 1.2 m/s |
| Working speed | AMR 0.6 m/s; AGV 1.2 m/s |
| Station positioning accuracy | ±5 mm |
| Battery | 48 V, 40 Ah, LiFePO4 |
| Runtime | 5 hours fully loaded; 8 hours at the reference arm/base 50% duty cycle |
| Charging | Manual or automatic docking; maximum current 20 A |
| Charging duration | Approximately 1.5 hours, 15–95% state of charge |

Do not transfer the reference model number, enclosure dimensions, chassis weight, turning/aisle clearances or the reference's ≤200 kg combined arm-and-carrier load into product-specific claims. They depend on hardware that visibly differs.

The source does not specify roller single-level payload, lift stroke, number of independently controlled transfer levels, roller speed or handoff height. Ask the user for the single-level payload and lift stroke; if unavailable, label these fields “Project-specific configuration”. Do not invent them.

## Implementation boundaries

The existing worktree contains unfinished multilingual changes from an earlier task. Preserve those changes and keep this product addition identifiable in separate commits. Do not deploy a dirty or unverified combination. Source changes must be committed and pushed to main before deployment.

## Verification

- Product overview card, navigation entry and all four language detail routes render.
- The original render remains fully visible on desktop and mobile.
- Parameter values retain units and operating conditions in every language.
- All product inquiry links preserve current form behavior.
- Self canonical, reciprocal hreflang and sitemap include the new route.
- Production build and targeted browser checks pass before publishing; verify the actual public URLs after deployment.

## Pending decision

User input is pending for roller single-level payload and lift stroke, or acceptance of project-specific labels. The general product-card-plus-detail-page scope was proposed previously and accepted through the supplied product information. No new visual design is requested.
