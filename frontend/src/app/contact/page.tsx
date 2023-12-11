import Container from "@/components/Container/Container";
import ContactContent from "@/components/ContactContent/ContactContent";
import {getPage} from "@/lib/contentful/createService";
async function Contact() {
  const pageData = await getPage('contact');

  return (
    <main>
      <Container>
        <ContactContent data={pageData?.fields} />
      </Container>
    </main>
  );
}

export default Contact;
