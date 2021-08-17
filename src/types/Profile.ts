import InstitutionProfile from './InstitutionProfile';

interface Profile {
  institutionProfiles: InstitutionProfile[];
  children: any[];
  age18AndOlder: null;
  overConsentAge: null;
  contactInfoEditable: null;
  portalRole: 'guardian' | string;
  isLatestDataPolicyAccepted: boolean;
  profileId: number;
  displayName: string;
}

export default Profile;
