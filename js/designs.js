/**
 * ============================================================
 * GRAPHIC DESIGN DATA
 * ============================================================
 * Add a new design by adding a new object to this array.
 * The "My Designs" gallery rebuilds itself automatically.
 *
 * Fields:
 *  - title       : Design name
 *  - category    : One of "POSTER", "SOCIAL MEDIA", "BRANDING", "LOGO",
 *                  "FLYER", "ADVERTISEMENT", "UI DESIGN", "OTHER"
 *  - image       : Path to the design image (leave the placeholder until you have a real one)
 *  - description : Short description
 *  - software    : Optional — software used (string), omit or leave "" if not needed
 * ============================================================
 */

const designs = [
  {
    title: "Design sample 1",
    category: "POSTER",
    // PLACE YOUR DESIGN IMAGE HERE
    image: "assets/images/designs/design-01.jpg",
    description: "Ajoutez ici la description de votre création.",
    software: "Adobe Illustrator"
  },
  {
    title: "Design sample 2",
    category: "SOCIAL MEDIA",
    // PLACE YOUR DESIGN IMAGE HERE
    image: "assets/images/designs/design-02.jpg",
    description: "Ajoutez ici la description de votre création.",
    software: "Adobe Illustrator"
  }

  /* ------------------------------------------------------------
     Example — copy this block to add a new design:

  ,{
    title: "My New Design",
    category: "BRANDING",
    image: "assets/images/designs/my-new-design.jpg",
    description: "Description of the design.",
    software: "Adobe Illustrator"
  }
  ------------------------------------------------------------ */
];
