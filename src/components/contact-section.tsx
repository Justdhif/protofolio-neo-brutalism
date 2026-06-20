import ContactContent from "./contact-content";

export default function ContactSection() {
  return (
    <section 
      id="contact" 
      className="py-24 px-4 md:px-8 bg-cream dark:bg-zinc-950 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        
        {/* Let's Work Together Section */}
        <div>
          <ContactContent />
        </div>

      </div>
    </section>
  );
}
