import Container from "@/components/Container/Container";
import ResumeContent from "@/components/ResumeContent/ResumeContent";
import { getResumeBySlug, getAllResumeSlugs } from "@/lib/contentful/createService";
import { notFound } from "next/navigation";

interface ResumePageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const slugs = await getAllResumeSlugs();

    return slugs.map((slug) => ({
        slug,
    }));
}

async function ResumePage({ params }: ResumePageProps) {
    const { slug } = params;

    // Fetch the resume data for the given slug
    const resumeData = await getResumeBySlug(slug);

    // If no resume is found for this slug, return 404
    if (!resumeData) {
        notFound();
    }

    return (
        <main>
            <Container>
                <ResumeContent data={resumeData?.fields} />
            </Container>
        </main>
    );
}

export default ResumePage;