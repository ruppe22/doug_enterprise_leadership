import { PageHero } from "@/components/PageHero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Contact"
        lede="Send a note directly from the site."
      />

      <div className="container-form page page-stack max-w-5xl mx-auto py-12 px-4">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          
          {/* Professional Details / CV Block */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Let's Connect</h2>
              <p className="mt-2 text-slate-600">
                Feel free to reach out via the form, or find my professional details below.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
              
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">Email</p>
                  <a href="mailto:doug@creativebygray.com" className="text-sm font-medium hover:text-blue-600">doug@creativebygray.com</a>
              </div>
</div>


          
          <div> <p className="text-xs font-semibold uppercase text-slate-500">Email</p>
          <a href="mailto:your.email@example.com" className="text-sm font-medium hover:text-blue-600">your.email@example.com</a>
           </div> 
</div>
          </div>

          {/* Contact Form */}
          <form action="/api/contact" method="post" className="card p-6 shadow-sm border border-slate-200 rounded-2xl">
            <div className="grid gap-4">
              <label className="grid gap-1">
                <span className="text-sm font-medium">Name</span>
                <input
                  name="name"
                  required
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm font-medium">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm font-medium">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </label>

              <button className="btn btn-primary bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors" type="submit">
                Send Message
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-2">
                
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
