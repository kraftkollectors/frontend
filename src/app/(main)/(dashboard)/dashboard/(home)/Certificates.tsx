import { CertificateCard } from "@/components/certificate/CertificateCard";
import ProfileCategory from "./ProfileCategory";
import { CertificatesAction } from "@/components/dashboard";
import { fetchUserCertificates } from "@/actions";

export default async function Certificates() {
  const certs = await fetchUserCertificates({ throwsError: false });
  if(!certs) return <></>
  if (certs == 'error') return <div className="info-box">failed to get certificates</div>

  return (
    <ProfileCategory
      title="Certificates"
      action={
        <CertificatesAction />
      }
    >
      {
        certs.length == 0 ? <div className="info-box">Nothing yet</div> :
          certs.map(cert => <CertificateCard
            key={cert._id}
            {...cert}
          />)
      }
    </ProfileCategory>
  );
}