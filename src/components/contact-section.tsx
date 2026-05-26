import ContactContent from "./contact-content";
import GuestbookBoard from "./guestbook-board";
import { getGuestbookMessages } from "@/app/actions/guestbook";

export default async function ContactSection() {
  const dbMessages = await getGuestbookMessages();
  
  const messages = dbMessages || [];

  return (
    <section 
      id="contact" 
      className="py-24 px-4 md:px-8 bg-[var(--color-cream)] dark:bg-zinc-950 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        
        {/* Let's Work Together & Guestbook Form */}
        <div>
          <ContactContent />
        </div>

        {/* Guestbook Board Section */}
        <div className="pt-20 border-t-[6px] border-black dark:border-zinc-800">
          <div className="mb-12 text-center">
            <h3 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tight">
              <span className="bg-black text-[var(--color-cream)] px-4 py-2 dark:bg-[var(--color-cream)] dark:text-black neo-border-sm transform rotate-1 inline-block">
                Guestbook Board
              </span>
            </h3>
            <p className="text-xl font-bold mt-6 text-zinc-700 dark:text-zinc-300">
              Notes left by awesome visitors.
            </p>
          </div>

          <GuestbookBoard messages={messages} />
        </div>

      </div>
    </section>
  );
}
