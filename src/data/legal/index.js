/**
 * 📜 משכן לב — Legal Data Index
 * ריכוז וייצוא כלל המסמכים המשפטיים, המודלים וה-JSONs
 */

import termsData from './terms.json';
import cancellationData from './cancellation.json';
import warrantyData from './warranty.json';
import privacyData from './privacy.json';
import accessibilityData from './accessibility.json';
import directLandingLegalData from './directLandingLegal.json';

export {
  termsData,
  cancellationData,
  warrantyData,
  privacyData,
  accessibilityData,
  directLandingLegalData
};

export const allLegalDocuments = {
  terms: termsData,
  cancellation: cancellationData,
  warranty: warrantyData,
  privacy: privacyData,
  accessibility: accessibilityData,
  directLanding: directLandingLegalData
};

export default allLegalDocuments;
