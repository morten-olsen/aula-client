import Image from './Image';

interface InstitutionProfile {
  profileId: number,
  id: number,
  institutionCode: string;
  institutionName: string;
  role: 'child' | string;
  name: string;
  profilePicture: Image;
  mainGroup: null;
  shortName: string;
  insitutionRolw: 'daycare' | string;
  metadata: string;
}

export default InstitutionProfile;
