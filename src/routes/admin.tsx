import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

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
  motivation: string;
  date_of_birth: string;
  nid_number: string;
  gender: string;
  whatsapp: string;
  facebook_link: string;
  photo_url: string;
  id_card_url: string;
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
  return <Dashboard onLogout={() => { sessionStorage.removeItem(STORAGE_KEY); setAuthed(false); }} />;
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
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <Toaster position="top-center" richColors />
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground">
            <span className="text-gold text-lg font-bold">CSF</span>
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
          className="group relative mt-4 w-full overflow-hidden rounded-xl bg-foreground px-6 py-3 font-semibold text-primary-foreground transition hover:shadow-[0_12px_32px_-8px_rgba(212,175,55,0.5)]"
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
      else setItems((data ?? []) as Submission[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-secondary/30">
      <Toaster position="top-center" richColors />

      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground">
              <span className="text-gold text-sm font-bold">CSF</span>
            </div>
            <div>
              <h1 className="font-display text-lg font-bold leading-none">Submissions</h1>
              <p className="text-xs text-muted-foreground">{items.length} total</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium hover:bg-secondary"
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
            {items.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 text-left shadow-[var(--shadow-card)] transition hover:border-[var(--gold)] hover:shadow-[0_12px_32px_-12px_rgba(212,175,55,0.4)]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={s.photo_url}
                    alt={s.full_name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--gold-soft)]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{s.full_name}</p>
                    <p className="truncate text-xs text-muted-foreground">{s.email}</p>
                  </div>
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

function DetailModal({ item, onClose }: { item: Submission; onClose: () => void }) {
  const rows: Array<[string, string]> = [
    ["Full Name", item.full_name],
    ["Email", item.email],
    ["Father's Name", item.father_name],
    ["Mobile", item.mobile],
    ["Address", item.address],
    ["Education", item.education],
    ["Motivation", item.motivation],
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
        className="my-8 w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl"
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

        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Photo</p>
            <a href={item.photo_url} target="_blank" rel="noreferrer">
              <img
                src={item.photo_url}
                alt="Submitted"
                className="aspect-square w-full rounded-xl object-cover ring-1 ring-border"
              />
            </a>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">ID Card</p>
            <a href={item.id_card_url} target="_blank" rel="noreferrer">
              <img
                src={item.id_card_url}
                alt="ID Card"
                className="aspect-square w-full rounded-xl object-cover ring-1 ring-border"
              />
            </a>
          </div>
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
