/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("ingredients").del();
  await knex("ingredients").insert([
    // Beneficial Ingredients
    {
      name: "Hyaluronic Acid",
      category: "Beneficial",
      description: "Hydrates and plumps the skin.",
    },
    {
      name: "Niacinamide",
      category: "Beneficial",
      description: "Reduces inflammation and improves skin texture.",
    },
    {
      name: "Retinol",
      category: "Beneficial",
      description: "Anti-aging and boosts collagen production.",
    },
    {
      name: "Vitamin C",
      category: "Beneficial",
      description: "Brightens skin and reduces hyperpigmentation.",
    },
    {
      name: "Ceramides",
      category: "Beneficial",
      description: "Protects the skin barrier and locks in moisture.",
    },
    {
      name: "Aloe Vera",
      category: "Beneficial",
      description: "Soothes and hydrates irritated skin.",
    },
    {
      name: "Glycerin",
      category: "Beneficial",
      description: "Hydrates and helps maintain the skin barrier.",
    },
    {
      name: "Zinc Oxide",
      category: "Beneficial",
      description: "Mineral sunscreen that protects against UV rays.",
    },
    {
      name: "Titanium Dioxide",
      category: "Beneficial",
      description: "Physical sunscreen that protects against UV rays.",
    },
    {
      name: "Green Tea Extract",
      category: "Beneficial",
      description: "Rich in antioxidants that calm the skin.",
    },
    {
      name: "Panthenol (Vitamin B5)",
      category: "Beneficial",
      description: "Hydrates and promotes skin healing.",
    },
    {
      name: "Centella Asiatica",
      category: "Beneficial",
      description: "Soothing and anti-inflammatory properties.",
    },
    {
      name: "Caffeine",
      category: "Beneficial",
      description: "Reduces puffiness and brightens under eyes.",
    },
    {
      name: "Peptides",
      category: "Beneficial",
      description: "Boosts collagen production and reduces fine lines.",
    },
    {
      name: "Cetearyl Alcohol",
      category: "Beneficial",
      description: "Emollient and stabilizer.",
    },
    {
      name: "Stearyl Alcohol",
      category: "Beneficial",
      description: "Moisturizing and soothing.",
    },
    {
      name: "Sodium Hyaluronate",
      category: "Beneficial",
      description: "Hydrates skin deeply.",
    },
    {
      name: "Ceramide NP",
      category: "Beneficial",
      description: "Strengthens skin barrier.",
    },
    {
      name: "Ceramide AP",
      category: "Beneficial",
      description: "Restores and protects skin barrier.",
    },
    {
      name: "Ceramide EOP",
      category: "Beneficial",
      description: "Improves skin hydration and elasticity.",
    },
    {
      name: "Dipotassium Phosphate",
      category: "Beneficial",
      description: "Helps maintain product stability and skin balance.",
    },
    {
      name: "Tocopherol",
      category: "Beneficial",
      description: "Vitamin E, an antioxidant that protects the skin.",
    },
    {
      name: "Cetyl Alcohol",
      category: "Beneficial",
      description: "Moisturizer and emulsifier, safe for sensitive skin.",
    },

    // Harmful Ingredients
    {
      name: "Parabens",
      category: "Harmful",
      description: "Linked to hormone disruption.",
    },
    {
      name: "Sodium Lauryl Sulfate (SLS)",
      category: "Harmful",
      description: "Strips natural oils and causes irritation.",
    },
    {
      name: "Formaldehyde",
      category: "Harmful",
      description: "Linked to cancer and skin irritation.",
    },
    {
      name: "Benzophenone",
      category: "Harmful",
      description: "Potentially carcinogenic and can cause skin irritation.",
    },
    {
      name: "Triclosan",
      category: "Harmful",
      description: "Linked to antibiotic resistance and hormone disruption.",
    },
    {
      name: "Hydroquinone",
      category: "Harmful",
      description: "May cause skin irritation and long-term damage.",
    },
    {
      name: "Coal Tar",
      category: "Harmful",
      description: "Banned in several countries due to carcinogenic risks.",
    },
    {
      name: "Oxybenzone",
      category: "Harmful",
      description: "A chemical sunscreen that disrupts hormones.",
    },
    {
      name: "Phthalates",
      category: "Harmful",
      description: "Linked to reproductive health concerns.",
    },
    {
      name: "Petroleum Jelly",
      category: "Harmful",
      description: "Can clog pores and contain harmful contaminants.",
    },
    {
      name: "Toluene",
      category: "Harmful",
      description: "A neurotoxin that can cause respiratory issues.",
    },

    // Potential Irritants
    {
      name: "Phenoxyethanol",
      category: "Potential Irritant",
      description: "Preservative that may cause irritation in sensitive skin.",
    },
    {
      name: "Disodium EDTA",
      category: "Potential Irritant",
      description: "May cause mild irritation for some skin types.",
    },
    {
      name: "Xanthan Gum",
      category: "Potential Irritant",
      description: "May cause mild irritation in sensitive individuals.",
    },
    {
      name: "Polysorbate",
      category: "Potential Irritant",
      description: "Can cause irritation or allergic reactions in some people.",
    },
    {
      name: "Alcohol Denat",
      category: "Potential Irritant",
      description: "Can be drying to the skin.",
    },
    {
      name: "Fragrance",
      category: "Potential Irritant",
      description: "Can cause irritation, especially in sensitive skin.",
    },
    {
      name: "Essential Oils",
      category: "Potential Irritant",
      description: "May trigger allergies or cause sensitivity.",
    },
    {
      name: "Lactic Acid",
      category: "Potential Irritant",
      description:
        "Exfoliating acid that can cause irritation in sensitive skin.",
    },
    {
      name: "Glycolic Acid",
      category: "Potential Irritant",
      description: "Strong AHA exfoliant that may cause redness.",
    },
    {
      name: "Benzoyl Peroxide",
      category: "Potential Irritant",
      description: "Can dry out and irritate sensitive skin.",
    },
    {
      name: "Tea Tree Oil",
      category: "Potential Irritant",
      description: "Can cause irritation if used in high concentrations.",
    },
    {
      name: "Menthol",
      category: "Potential Irritant",
      description: "Cooling effect may cause irritation on sensitive skin.",
    },
    {
      name: "Limonene",
      category: "Potential Irritant",
      description:
        "A citrus extract that may cause irritation or allergic reactions.",
    },
    {
      name: "Sodium Hydroxide",
      category: "Potential Irritant",
      description: "Strong pH adjuster that may be harsh on the skin.",
    },
    {
      name: "Urea",
      category: "Potential Irritant",
      description: "May cause irritation in high concentrations.",
    },
  ]);
}
