import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import logo from "@/assets/csf-logo.png";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const ADMIN_PASSWORD = "csfcyberforce";
const STORAGE_KEY = "csf_admin_auth";

interface Submission {
  id: string;
  full_name: string;
  email: string;
  father_name: string;
  mobile: string;
  address: string;
  education: string;
  motivation: string | null;
  date_of_birth: string;
  nid_number: string;
  gender: string;
  whatsapp: string;
  facebook_link: string;
  photo_url: string[];
  id_card_url: string[];
  created_at: string;
}

function AdminPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;
  return (
    <Dashboard
      onLogout={() => {
        sessionStorage.removeItem(STORAGE_KEY);
        setAuthed(false);
      }}
    />
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [pwd, setPwd] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      onSuccess();
    } else {
      toast.error("Incorrect password");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-60" />
      <Toaster position="top-center" richColors />
      <form
        onSubmit={submit}
        className="animate-fade-up relative w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground p-1.5 ring-1 ring-[var(--gold)]/40">
            <img src={logo} alt="CSF" className="h-full w-full rounded-full object-cover" />
          </div>
          <h1 className="font-display text-2xl font-bold">Admin Panel</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter password to continue</p>
        </div>
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-soft)]"
        />
        <button
          type="submit"
          className="group relative mt-4 w-full overflow-hidden rounded-xl bg-foreground px-6 py-3 font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-8px_rgba(212,175,55,0.5)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-[var(--gradient-gold)] transition-transform duration-500 group-hover:translate-x-0" />
          <span className="relative">Sign In</span>
        </button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      else setItems((data ?? []) as unknown as Submission[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-secondary/30">
      <Toaster position="top-center" richColors />

      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-foreground p-1 ring-1 ring-[var(--gold)]/40">
              <img src={logo} alt="CSF" className="h-10 w-10 rounded-full object-cover" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold leading-none">
                CSF <span className="text-gold">Admin</span>
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">{items.length} submissions</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium transition hover:border-[var(--gold)] hover:bg-secondary"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
            <p className="text-muted-foreground">No submissions yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
                className="lift-card animate-fade-up group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 text-left shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={s.photo_url?.[0]}
                    alt={s.full_name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--gold-soft)]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{s.full_name}</p>
                    <p className="truncate text-xs text-muted-foreground">{s.email}</p>
                  </div>
                  {s.photo_url?.length > 1 && (
                    <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold text-gold">
                      +{s.photo_url.length - 1}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{s.mobile}</span>
                  <span>{new Date(s.created_at).toLocaleDateString()}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {selected && <DetailModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ImageGallery({ title, urls }: { title: string; urls: string[] }) {
  const [preview, setPreview] = useState<string | null>(null);
  if (!urls?.length) return null;
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
      <div className="grid grid-cols-3 gap-2">
        {urls.map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setPreview(u)}
            className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-border transition hover:ring-[var(--gold)]"
          >
            <img
              src={u}
              alt={title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      {preview && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            alt="preview"
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl"
          />
          <button
            onClick={() => setPreview(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur hover:bg-white/20"
            aria-label="Close preview"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function DetailModal({ item, onClose }: { item: Submission; onClose: () => void }) {
  const rows: Array<[string, string]> = [
    ["Full Name", item.full_name],
    ["Email", item.email],
    ["Father's Name", item.father_name],
    ["Mobile", item.mobile],
    ["Address", item.address],
    ["Education", item.education],
    ["Motivation", item.motivation ?? "—"],
    ["Date of Birth", item.date_of_birth],
    ["NID / Birth Reg.", item.nid_number],
    ["Gender", item.gender],
    ["WhatsApp", item.whatsapp],
    ["Facebook", item.facebook_link],
    ["Submitted At", new Date(item.created_at).toLocaleString()],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-fade-up my-8 w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-xl font-bold">{item.full_name}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="space-y-5 p-5">
          <ImageGallery title={`Photos (${item.photo_url?.length ?? 0})`} urls={item.photo_url ?? []} />
          <ImageGallery title={`ID Cards (${item.id_card_url?.length ?? 0})`} urls={item.id_card_url ?? []} />
        </div>

        <dl className="divide-y divide-border border-t border-border">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-3 gap-4 px-5 py-3 text-sm">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="col-span-2 break-words font-medium">
                {k === "Facebook" ? (
                  <a href={v} target="_blank" rel="noreferrer" className="text-gold underline">
                    {v}
                  </a>
                ) : (
                  v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
