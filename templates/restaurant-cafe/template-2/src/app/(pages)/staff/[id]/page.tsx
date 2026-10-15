import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStaffMemberById, staffMembers } from "@/lib/restaurant-data";
import { getLocalizedStaff } from "@/lib/i18n-data";
import { StaffDetailView } from "@/components/pages/staff-detail-view";

interface StaffDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return staffMembers.map((staff) => ({
    id: staff.id,
  }));
}

export async function generateMetadata({
  params,
}: StaffDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const rawStaff = getStaffMemberById(id);

  if (!rawStaff) {
    return {
      title: "Staf Tidak Ditemukan | Deny Restaurant",
      description: "Profil staf yang diminta tidak dapat ditemukan.",
    };
  }

  const staff = getLocalizedStaff(rawStaff, "id");

  return {
    title: `${staff.name} — ${staff.role} | Deny Restaurant`,
    description: `${staff.name}, ${staff.role} di Deny Restaurant. ${staff.bio}`,
    openGraph: {
      title: `${staff.name} — ${staff.role} | Deny Restaurant`,
      description: staff.bio,
      images: [
        {
          url: staff.image,
          width: 800,
          height: 1000,
          alt: staff.name,
        },
      ],
    },
  };
}

export default async function StaffDetailPage({ params }: StaffDetailPageProps) {
  const { id } = await params;
  const staff = getStaffMemberById(id);

  if (!staff) {
    notFound();
  }

  return <StaffDetailView staff={staff} />;
}
