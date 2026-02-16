import { redirect } from "next/navigation";

type PageProps = {
  params: { slug: string };
};

export default function WritingDetailRedirectPage({ params }: PageProps) {
  redirect(`/thought-leadership/${params.slug}`);
}
