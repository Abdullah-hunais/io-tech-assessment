// src/app/services/[slug]/page.tsx
import ServiceDetailComponent from "./ServiceDetailComponent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ServiceDetailComponent slug={slug} />;
}
