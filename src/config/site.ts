// ============================================================================
// SITE / ENTITY CONFIG — 单景点 SEO 实体绑定配置变量表
// ----------------------------------------------------------------------------
// 这是整站唯一的实体变量来源。换一个景点站时，只需替换下表中的变量即可
// 复用到其它单景点项目。变量与占位符的对应关系：
//
//   domain              -> {{DOMAIN_NAME}}
//   attractionFullName  -> {{ATTRACTION_FULL_NAME}}
//   attractionShortName -> {{ATTRACTION_SHORT_NAME}}
//   city                -> {{CITY_NAME}}
//   province            -> {{STATE_PROVINCE}}
//   country             -> {{COUNTRY_NAME}}
//   countryCode         -> {{COUNTRY_CODE_2LETTER}}
//   postalCode          -> {{POSTAL_CODE}}
//   latitude            -> {{LATITUDE}}
//   longitude           -> {{LONGITUDE}}
//   mapsShareUrl        -> {{MAPS_SHARE_URL}}
//   mapsEmbedSrc        -> {{MAPS_EMBED_SRC}}
//   nearbyLandmark1     -> {{NEARBY_LANDMARK_1}}
//   nearbyLandmark2     -> {{NEARBY_LANDMARK_2}}
//   govtTourismUrl      -> {{GOVT_TOURISM_URL}}
// ============================================================================
export const siteConfig = {
  // --- brand ---
  name: 'Chiang Khan Walking Street (ถนนคนเดินเชียงคาน)',
  baseUrl: process.env.CURRENT_SITE_DOMAIN ? `https://${process.env.CURRENT_SITE_DOMAIN}` : 'https://chiangkhanwalkingstreet.com',
  slug: 'chiang-khan-walking-street',
  locales: ['zh', 'en', 'th'] as const,

  // --- {{DOMAIN_NAME}} ---
  domain: 'chiangkhanwalkingstreet.com',

  // --- entity identity ---
  attractionFullName: 'Chiang Khan Walking Street', // {{ATTRACTION_FULL_NAME}}
  attractionShortName: 'Chiang Khan Walking Street', // {{ATTRACTION_SHORT_NAME}}
  attractionLocalName: 'ถนนคนเดินเชียงคาน', // endonym (Thai script)
  city: 'Chiang Khan', // {{CITY_NAME}}
  province: 'Loei', // {{STATE_PROVINCE}}
  country: 'Thailand', // {{COUNTRY_NAME}}
  countryCode: 'TH', // {{COUNTRY_CODE_2LETTER}}
  postalCode: '42110', // {{POSTAL_CODE}}
  // Kept separate from the full formatted address so structured data can put
  // the street in `streetAddress` and the rest in locality/region, rather than
  // repeating the whole string in every field.
  streetAddress: 'Chai Kong Road',

  // --- geo ---
  latitude: 17.8969, // {{LATITUDE}}
  longitude: 101.6594, // {{LONGITUDE}}
  plusCode: 'VMW6+R8 Chiang Khan',

  // --- maps ---
  mapsShareUrl: 'https://maps.app.goo.gl/TwNr5mSMUff1hf8G7', // {{MAPS_SHARE_URL}}
  mapsEmbedSrc: 'https://www.google.com/maps?q=17.8969,101.6594&z=16&output=embed', // {{MAPS_EMBED_SRC}}

  // --- nearby semantic cluster ---
  nearbyLandmark1: 'Wat Si Khun Mueang', // {{NEARBY_LANDMARK_1}}
  nearbyLandmark2: 'Kaeng Khut Khu', // {{NEARBY_LANDMARK_2}}

  // --- authoritative .org outbound link ---
  govtTourismUrl: 'https://www.tourismthailand.org/', // {{GOVT_TOURISM_URL}}

  // --- weather context ---
  // Drives the advice rule packs: only the environments listed here contribute
  // advice, so a riverside street never inherits mountain or desert guidance.
  environments: ['riverside', 'urban'] as const,
  /** Shophouses / temples along the route can be used as temporary shelter. */
  indoorShelter: true,
  /** Visitors are expected to cover shoulders and knees at the temples. */
  dressCode: true,
  /** Opening hours of the attraction itself, used for the evening rain window. */
  marketHours: { open: '17:00', close: '22:00' },

  // --- analytics ---
  ga4MeasurementId: 'G-HXM22WWPKP',

  // --- rating / review provenance ---
  ratingSourceName: 'Google Maps',
  ratingRetrieved: 'October 2026',
} as const;

/** Absolute site origin, resolved at build time (respects CURRENT_SITE_DOMAIN). */
export const SITE_URL = siteConfig.baseUrl;
