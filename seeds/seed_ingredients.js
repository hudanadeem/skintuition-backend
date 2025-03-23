/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("ingredients").del();
  await knex("ingredients").insert([
    { name: "Hyaluronic Acid", category: "Beneficial", description: "Hydrates and plumps the skin.", suitable_for: "dry, normal, combination, sensitive" },
    { name: "Niacinamide", category: "Beneficial", description: "Reduces inflammation and improves skin texture.", suitable_for: "all" },
    { name: "Retinol", category: "Beneficial", description: "Anti-aging and boosts collagen production.", suitable_for: "oily, combination, normal" },
    { name: "Vitamin C", category: "Beneficial", description: "Brightens skin and reduces hyperpigmentation.", suitable_for: "all" },
    { name: "Ceramides", category: "Beneficial", description: "Protects the skin barrier and locks in moisture.", suitable_for: "dry, normal, sensitive" },
    { name: "Aloe Vera", category: "Beneficial", description: "Soothes and hydrates irritated skin.", suitable_for: "all" },
    { name: "Glycerin", category: "Beneficial", description: "Hydrates and helps maintain the skin barrier.", suitable_for: "all" },
    { name: "Zinc Oxide", category: "Beneficial", description: "Mineral sunscreen that protects against UV rays.", suitable_for: "all" },
    { name: "Titanium Dioxide", category: "Beneficial", description: "Physical sunscreen that protects against UV rays.", suitable_for: "all" },
    { name: "Green Tea Extract", category: "Beneficial", description: "Rich in antioxidants that calm the skin.", suitable_for: "sensitive, combination, normal" },
    { name: "Panthenol (Vitamin B5)", category: "Beneficial", description: "Hydrates and promotes skin healing.", suitable_for: "all" },
    { name: "Centella Asiatica", category: "Beneficial", description: "Soothing and anti-inflammatory properties.", suitable_for: "sensitive, dry, normal" },
    { name: "Caffeine", category: "Beneficial", description: "Reduces puffiness and brightens under eyes.", suitable_for: "all" },
    { name: "Peptides", category: "Beneficial", description: "Boosts collagen production and reduces fine lines.", suitable_for: "all" },
    { name: "Cetearyl Alcohol", category: "Beneficial", description: "Emollient and stabilizer.", suitable_for: "all" },
    { name: "Stearyl Alcohol", category: "Beneficial", description: "Moisturizing and soothing.", suitable_for: "all" },
    { name: "Sodium Hyaluronate", category: "Beneficial", description: "Hydrates skin deeply.", suitable_for: "dry, normal, sensitive" },
    { name: "Ceramide NP", category: "Beneficial", description: "Strengthens skin barrier.", suitable_for: "dry, normal, sensitive" },
    { name: "Ceramide AP", category: "Beneficial", description: "Restores and protects skin barrier.", suitable_for: "dry, normal, sensitive" },
    { name: "Ceramide EOP", category: "Beneficial", description: "Improves skin hydration and elasticity.", suitable_for: "dry, normal, sensitive" },
    { name: "Argan Oil", category: "Beneficial", description: "Hydrates and nourishes the skin.", suitable_for: "dry, normal" },
    { name: "Shea Butter", category: "Beneficial", description: "Deeply moisturizes and soothes.", suitable_for: "dry, sensitive" },
    { name: "Squalane", category: "Beneficial", description: "Balances oil production and hydrates.", suitable_for: "all" },
    { name: "Allantoin", category: "Beneficial", description: "Soothing, helps skin repair.", suitable_for: "sensitive, dry" },
    { name: "Mandelic Acid", category: "Beneficial", description: "Gentle exfoliator, good for acne-prone skin.", suitable_for: "oily, combination, normal" },

    { name: "Parabens", category: "Harmful", description: "Linked to hormone disruption.", suitable_for: "none" },
    { name: "Sodium Lauryl Sulfate (SLS)", category: "Harmful", description: "Strips natural oils and causes irritation.", suitable_for: "none" },
    { name: "Formaldehyde", category: "Harmful", description: "Linked to cancer and skin irritation.", suitable_for: "none" },
    { name: "Benzophenone", category: "Harmful", description: "Potentially carcinogenic and can cause skin irritation.", suitable_for: "none" },
    { name: "Triclosan", category: "Harmful", description: "Linked to antibiotic resistance and hormone disruption.", suitable_for: "none" },
    { name: "Oxybenzone", category: "Harmful", description: "A chemical sunscreen that disrupts hormones.", suitable_for: "none" },
    { name: "Phthalates", category: "Harmful", description: "Linked to reproductive health concerns.", suitable_for: "none" },
    { name: "Petroleum Jelly", category: "Harmful", description: "Can clog pores and contain harmful contaminants.", suitable_for: "none" },
    { name: "Toluene", category: "Harmful", description: "A neurotoxin that can cause respiratory issues.", suitable_for: "none" },

    { name: "Phenoxyethanol", category: "Potential Irritant", description: "Preservative that may cause irritation in sensitive skin.", suitable_for: "sensitive" },
    { name: "Disodium EDTA", category: "Potential Irritant", description: "May cause mild irritation for some skin types.", suitable_for: "sensitive" },
    { name: "Xanthan Gum", category: "Potential Irritant", description: "May cause mild irritation in sensitive individuals.", suitable_for: "sensitive" },
    { name: "Polysorbate", category: "Potential Irritant", description: "Can cause irritation or allergic reactions in some people.", suitable_for: "sensitive" },
    { name: "Alcohol Denat", category: "Potential Irritant", description: "Can be drying to the skin.", suitable_for: "oily" },
    { name: "Fragrance", category: "Potential Irritant", description: "Can cause irritation, especially in sensitive skin.", suitable_for: "sensitive" },
    { name: "Essential Oils", category: "Potential Irritant", description: "May trigger allergies or cause sensitivity.", suitable_for: "sensitive" },
    { name: "Lactic Acid", category: "Potential Irritant", description: "Exfoliating acid that can cause irritation in sensitive skin.", suitable_for: "sensitive, oily, combination" },
    { name: "Glycolic Acid", category: "Potential Irritant", description: "Strong AHA exfoliant that may cause redness.", suitable_for: "oily, combination" },
    { name: "Benzoyl Peroxide", category: "Potential Irritant", description: "Can dry out and irritate sensitive skin.", suitable_for: "oily, acne-prone" },
    { name: "Menthol", category: "Potential Irritant", description: "Cooling effect may cause irritation on sensitive skin.", suitable_for: "sensitive" }
  ]);
}
