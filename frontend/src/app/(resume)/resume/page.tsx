import Container from "@/components/Container/Container";
import ResumeContent from "@/components/ResumeContent/ResumeContent";
import {getResume} from "@/lib/contentful/createService";
async function Resume() {
  const resumeData = await getResume();

  return (
    <main>
      <Container>
        <ResumeContent data={resumeData?.fields} />
      </Container>
    </main>
  );
}

export default Resume;
