function paragraph(text, key) {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${key}-span`,
        _type: "span",
        marks: [],
        text
      }
    ]
  };
}

function heading(text, key, style = "h2") {
  return {
    _key: key,
    _type: "block",
    style,
    markDefs: [],
    children: [
      {
        _key: `${key}-span`,
        _type: "span",
        marks: [],
        text
      }
    ]
  };
}

const BLOG_BODY_OVERRIDES = {
  "agv-what-is-automated-guided-vehicle": [
    heading("How Does an AGV Work?", "agv-work-title"),
    paragraph(
      "The working logic of an AGV can usually be divided into four steps: task reception, positioning and navigation, transport execution, and status feedback. A higher level management system or scheduling system first sends a task instruction. The AGV then travels to the pickup point based on a predefined route or navigation logic, delivers the material to the target location, sends back real time status updates and exception alerts, and updates the related material information in the management system.",
      "agv-work-paragraph-1"
    ),
    paragraph(
      "From a system perspective, a practical AGV solution is not just a vehicle. It also includes the software system, communication system, and on site integration logic. That is exactly why the value of an AGV is not simply that it can run automatically, but that it can reliably fit into the customer's existing production rhythm and logistics rules while also enabling material traceability.",
      "agv-work-paragraph-2"
    ),
    paragraph(
      "For applications with relatively fixed routes, high transport frequency, and clearly defined workstation relationships, AGVs can deliver greater consistency and less human variability. They are especially suitable for companies that want to reduce forklift traffic, lower dependence on manual handling, and improve visibility across internal material flows.",
      "agv-work-paragraph-3"
    ),
    heading("Types of AGVs and Their Applications", "agv-types-title"),
    paragraph(
      "AGVs can be understood from two main angles: one is classification by navigation method, and the other is classification by application type. Different classifications correspond to different site conditions and operational needs.",
      "agv-types-paragraph-1"
    ),
    heading("By Navigation Method", "agv-navigation-title", "h3"),
    heading("QR code guided AGV", "agv-qr-title", "h3"),
    paragraph(
      "A QR code guided AGV determines its position and travel path by reading QR codes placed on the floor. It offers relatively flexible deployment, and route changes are easier to implement. It is well suited for production line delivery, workshop material transfer, and point to point transport inside warehouses where some flexibility is needed while implementation cost still needs to be controlled.",
      "agv-qr-paragraph"
    ),
    heading("Magnetic tape guided AGV", "agv-magnetic-title", "h3"),
    paragraph(
      "A magnetic tape guided AGV travels by following magnetic tape laid on the floor. Its routes are clear and its control logic is stable, making it a good fit for production environments where transport workflows are fixed and routes rarely change over time. It is commonly used for fixed route delivery in manufacturing workshops, material transfer between fixed workstations, and other intralogistics tasks with stable production rhythms.",
      "agv-magnetic-paragraph"
    ),
    heading("Laser guided AGV", "agv-laser-title", "h3"),
    paragraph(
      "A laser guided AGV uses laser sensors and environmental reflectors for positioning. It offers greater route flexibility and is better suited for sites with more complex routes, more workstations, and stronger expansion needs. It is often used in large warehouses, flexible manufacturing workshops, cross area material transport, and projects that require better adaptability to layout changes.",
      "agv-laser-paragraph"
    ),
    heading("By Application Type", "agv-application-title", "h3"),
    heading("Towing AGV", "agv-towing-title", "h3"),
    paragraph(
      "A towing AGV completes transport tasks by pulling carts, trolleys, or tooling carriers, making it ideal for one to many delivery models. It is often used for line side replenishment, timed parts delivery, and workshop circulation logistics, especially in transport tasks with strong batch characteristics and recurring cycles.",
      "agv-towing-paragraph"
    ),
    heading("Load carrying AGV or unit load AGV", "agv-unit-load-title", "h3"),
    paragraph(
      "This type of AGV carries pallets, bins, or totes directly and is well suited for standardized load transport. It is commonly used for semi finished goods transfer, pallet movement, automatic transport between workstations, and distribution between warehouses and production lines. This type of AGV is also used in ASRS applications.",
      "agv-unit-load-paragraph"
    ),
    heading("Forklift AGV", "agv-forklift-title", "h3"),
    paragraph(
      "A forklift AGV is capable of automatic pickup, drop off, stacking, and docking. It is suitable for pallet putaway, outbound handling, rack docking, and line side feeding. For companies that want to reduce reliance on manual forklifts and improve pallet logistics automation, this type of AGV is widely used.",
      "agv-forklift-paragraph"
    ),
    heading("Robotlyne composite AGV with robotic arm integration", "agv-composite-title", "h3"),
    paragraph(
      "Robotlyne has developed a composite AGV that combines an AGV with a robotic arm. It can not only move autonomously, but also perform picking, machine tending, loading and unloading, assisted assembly, and workstation service tasks. It is suitable for a wide range of support applications, especially flexible automation scenarios that require both mobility and operational capability, such as machine loading and unloading, workstation support transport, and cross equipment collaboration.",
      "agv-composite-paragraph"
    )
  ]
};

export function getBlogBodyOverride(postOrSlug) {
  if (!postOrSlug) {
    return null;
  }

  const slug = typeof postOrSlug === "string" ? postOrSlug : postOrSlug.slug;
  return BLOG_BODY_OVERRIDES[slug] || null;
}
