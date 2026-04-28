import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import logo from "@/assets/csf-logo.png";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const ADMIN_PASSWORD = "csfcyberforce";
const STORAGE_KEY = "csf_admin_auth";

type Status = "pending" | "approved" | "rejected";
type Filter = "all" | Status;

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
  is_read: boolean;
  status: Status;
  reject_reason: string | null;
}

interface EmailSettings {
  publicKey: string;
  serviceId: string;
  approveTemplateId: string;
  rejectTemplateId: string;
}

const defaultSettings: EmailSettings = {
  publicKey: "",
  serviceId: "",
  approveTemplateId: "",
  rejectTemplateId: "",
};

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

function showBrowserNotification(title: string, body: string) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    new Notification(title, { body, icon: "/icon-192.png", badge: "/icon-192.png", tag: "csf-new-submission" });
  } catch {
    navigator.serviceWorker?.getRegistration().then((reg) => {
      reg?.showNotification(title, { body, icon: "/icon-192.png", badge: "/icon-192.png" });
    });
  }
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; cls: string }> = {
    pending: {
      label: "Pending",
      cls: "bg-[var(--gold-soft)] text-foreground ring-1 ring-[var(--gold)]/50",
    },
    approved: {
      label: "Approved",
      cls: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300",
    },
    rejected: {
      label: "Rejected",
      cls: "bg-red-100 text-red-800 ring-1 ring-red-300",
    },
  };
  const v = map[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${v.cls}`}>
      {v.label}
    </span>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState<EmailSettings>(defaultSettings);
  const [notifPerm, setNotifPerm] = useState<NotificationPermission | "unsupported">(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "unsupported",
  );
  const initialLoadDone = useRef(false);
  const settingsRef = useRef<EmailSettings>(defaultSettings);

  // Load config from database
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("config" as never)
        .select("public_key, service_id, approve_template_id, reject_template_id")
        .limit(1)
        .maybeSingle();
      if (data) {
        const loaded: EmailSettings = {
          publicKey: (data as { public_key?: string }).public_key ?? "",
          serviceId: (data as { service_id?: string }).service_id ?? "",
          approveTemplateId: (data as { approve_template_id?: string }).approve_template_id ?? "",
          rejectTemplateId: (data as { reject_template_id?: string }).reject_template_id ?? "",
        };
        setSettings(loaded);
        settingsRef.current = loaded;
      }
    })();
  }, []);

  // Hidden config command — exposed on window for admin developer use only
  useEffect(() => {
    const w = window as unknown as {
      __csfConfig?: (input: unknown) => Promise<string>;
    };
    w.__csfConfig = async (input: unknown) => {
      try {
        if (sessionStorage.getItem(STORAGE_KEY) !== "1") return "Unauthorized";
        const obj = typeof input === "string" ? JSON.parse(input) : input;
        if (!obj || (obj as { type?: string }).type !== "config") return "Invalid: missing type=config";
        const payload = {
          public_key: String((obj as Record<string, unknown>).public_key ?? ""),
          service_id: String((obj as Record<string, unknown>).service_id ?? ""),
          approve_template_id: String((obj as Record<string, unknown>).approve_template_id ?? ""),
          reject_template_id: String((obj as Record<string, unknown>).reject_template_id ?? ""),
          updated_at: new Date().toISOString(),
        };
        const { data: existing } = await supabase
          .from("config" as never)
          .select("id")
          .limit(1)
          .maybeSingle();
        if (existing && (existing as { id?: string }).id) {
          const { error } = await supabase
            .from("config" as never)
            .update(payload as never)
            .eq("id", (existing as { id: string }).id);
          if (error) return "Error: " + error.message;
        } else {
          const { error } = await supabase.from("config" as never).insert(payload as never);
          if (error) return "Error: " + error.message;
        }
        const next: EmailSettings = {
          publicKey: payload.public_key,
          serviceId: payload.service_id,
          approveTemplateId: payload.approve_template_id,
          rejectTemplateId: payload.reject_template_id,
        };
        setSettings(next);
        settingsRef.current = next;
        return "Config saved";
      } catch (e) {
        return "Error: " + (e instanceof Error ? e.message : "invalid input");
      }
    };
    return () => {
      delete w.__csfConfig;
    };
  }, []);


  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      else setItems((data ?? []) as unknown as Submission[]);
      setLoading(false);
      initialLoadDone.current = true;
    })();

    const channel = supabase
      .channel("submissions-stream")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "submissions" }, (payload) => {
        const row = payload.new as unknown as Submission;
        setItems((prev) => {
          const without = prev.filter((p) => p.id !== row.id && p.email !== row.email);
          return [row, ...without];
        });
        if (initialLoadDone.current) {
          toast.success("New Application Received", { description: row.full_name });
          showBrowserNotification("New Application Received", `${row.full_name} just applied`);
        }
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "submissions" }, (payload) => {
        const row = payload.new as unknown as Submission;
        setItems((prev) => prev.map((p) => (p.id === row.id ? row : p)));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "submissions" }, (payload) => {
        const row = payload.old as { id: string };
        setItems((prev) => prev.filter((p) => p.id !== row.id));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function openSubmission(s: Submission) {
    setSelected(s);
    if (!s.is_read) {
      setItems((prev) => prev.map((p) => (p.id === s.id ? { ...p, is_read: true } : p)));
      const { error } = await supabase.from("submissions").update({ is_read: true }).eq("id", s.id);
      if (error) {
        toast.error("Couldn't mark as read");
        setItems((prev) => prev.map((p) => (p.id === s.id ? { ...p, is_read: false } : p)));
      }
    }
  }

  async function enableNotifications() {
    if (!("Notification" in window)) {
      toast.error("Notifications not supported on this device");
      return;
    }
    try {
      if ("serviceWorker" in navigator) {
        await navigator.serviceWorker.register("/sw.js").catch(() => {});
      }
      const perm = await Notification.requestPermission();
      setNotifPerm(perm);
      if (perm === "granted") {
        toast.success("Notifications enabled");
        showBrowserNotification("Notifications enabled", "You'll be notified of new applications.");
      }
    } catch {
      toast.error("Couldn't enable notifications");
    }
  }

  async function sendEmail(templateId: string, params: Record<string, string>) {
    if (!settings.publicKey || !settings.serviceId || !templateId) {
      toast.error("Configure EmailJS in Settings first");
      return false;
    }
    try {
      await emailjs.send(settings.serviceId, templateId, params, { publicKey: settings.publicKey });
      return true;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Email failed";
      toast.error(`Email error: ${msg}`);
      return false;
    }
  }

  async function approve(s: Submission) {
    const { error } = await supabase
      .from("submissions")
      .update({ status: "approved", reject_reason: null } as never)
      .eq("id", s.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setItems((prev) => prev.map((p) => (p.id === s.id ? { ...p, status: "approved", reject_reason: null } : p)));
    setSelected((prev) => (prev && prev.id === s.id ? { ...prev, status: "approved", reject_reason: null } : prev));
    toast.success("Approved");
    const ok = await sendEmail(settings.approveTemplateId, {
      name: s.full_name,
      to_email: s.email,
      email: s.email,
    });
    if (ok) toast.success("Approval email sent");
  }

  async function reject(s: Submission, reason: string) {
    const { error } = await supabase
      .from("submissions")
      .update({ status: "rejected", reject_reason: reason || null } as never)
      .eq("id", s.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setItems((prev) => prev.map((p) => (p.id === s.id ? { ...p, status: "rejected", reject_reason: reason || null } : p)));
    setSelected((prev) => (prev && prev.id === s.id ? { ...prev, status: "rejected", reject_reason: reason || null } : prev));
    toast.success("Rejected");
    const ok = await sendEmail(settings.rejectTemplateId, {
      name: s.full_name,
      to_email: s.email,
      email: s.email,
      reason: reason || "—",
    });
    if (ok) toast.success("Rejection email sent");
  }

  async function remove(s: Submission) {
    const { error } = await supabase.from("submissions").delete().eq("id", s.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setItems((prev) => prev.filter((p) => p.id !== s.id));
    setSelected(null);
    toast.success("Deleted");
  }

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.status === filter)),
    [items, filter],
  );

  const counts = useMemo(
    () => ({
      all: items.length,
      pending: items.filter((i) => i.status === "pending").length,
      approved: items.filter((i) => i.status === "approved").length,
      rejected: items.filter((i) => i.status === "rejected").length,
    }),
    [items],
  );

  const unreadCount = items.filter((i) => !i.is_read).length;

  return (
    <div className="min-h-screen bg-secondary/30">
      <Toaster position="top-center" richColors />

      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-foreground p-1 ring-1 ring-[var(--gold)]/40">
              <img src={logo} alt="CSF" className="h-10 w-10 rounded-full object-cover" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold leading-none">
                CSF <span className="text-gold">Admin</span>
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                {items.length} submissions
                {unreadCount > 0 && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-[var(--gold-soft)] px-2 py-0.5 text-[10px] font-semibold text-foreground ring-1 ring-[var(--gold)]/40">
                    {unreadCount} new
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Filter hamburger */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium transition hover:border-[var(--gold)]"
                aria-label="Filter"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
                <span className="hidden sm:inline capitalize">{filter}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-white shadow-lg">
                  {(["all", "pending", "approved", "rejected"] as Filter[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setFilter(f);
                        setMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-sm capitalize transition hover:bg-secondary ${filter === f ? "bg-[var(--gold-soft)]/40 font-semibold" : ""}`}
                    >
                      <span>{f}</span>
                      <span className="text-xs text-muted-foreground">{counts[f]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setSettingsOpen(true)}
              className="rounded-lg border border-border bg-white p-2 transition hover:border-[var(--gold)]"
              aria-label="Settings"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>

            {notifPerm !== "granted" && notifPerm !== "unsupported" && (
              <button
                onClick={enableNotifications}
                className="rounded-lg border border-[var(--gold)]/50 bg-[var(--gold-soft)] px-3 py-2 text-xs font-medium text-foreground transition hover:bg-[var(--gold)]/30"
              >
                🔔 Alerts
              </button>
            )}
            <button
              onClick={onLogout}
              className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium transition hover:border-[var(--gold)] hover:bg-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
            <p className="text-muted-foreground">No submissions {filter !== "all" ? `(${filter})` : "yet"}.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => (
              <button
                key={s.id}
                onClick={() => openSubmission(s)}
                style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
                className={`lift-card animate-fade-up group relative flex flex-col gap-3 rounded-2xl border p-5 text-left shadow-[var(--shadow-card)] ${
                  s.is_read
                    ? "border-border bg-card"
                    : "border-[var(--gold)]/50 bg-[var(--gold-soft)]/40 ring-1 ring-[var(--gold)]/30"
                }`}
              >
                <div className="absolute right-3 top-3 flex items-center gap-1.5">
                  {!s.is_read && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold shadow">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)]" />
                      New
                    </span>
                  )}
                  <StatusBadge status={s.status} />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <img
                    src={s.photo_url?.[0]}
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

      {selected && (
        <DetailModal
          item={selected}
          onClose={() => setSelected(null)}
          onApprove={approve}
          onReject={reject}
          onDelete={remove}
        />
      )}

      {settingsOpen && (
        <SettingsModal
          settings={settings}
          onClose={() => setSettingsOpen(false)}
          onSave={(s) => {
            setSettings(s);
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
            toast.success("Settings saved");
            setSettingsOpen(false);
          }}
        />
      )}
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
            <img src={u} alt={title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
          </button>
        ))}
      </div>
      {preview && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur"
          onClick={() => setPreview(null)}
        >
          <img src={preview} alt="preview" className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl" />
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

function ConfirmDialog({
  title,
  description,
  confirmWord,
  confirmLabel,
  confirmClass,
  extraInput,
  onCancel,
  onConfirm,
}: {
  title: string;
  description: string;
  confirmWord: string;
  confirmLabel: string;
  confirmClass: string;
  extraInput?: { label: string; placeholder: string; value: string; onChange: (v: string) => void };
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [typed, setTyped] = useState("");
  const matches = typed === confirmWord;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur" onClick={onCancel}>
      <div
        className="animate-fade-up w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>

        {extraInput && (
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {extraInput.label}
            </label>
            <textarea
              value={extraInput.value}
              onChange={(e) => extraInput.onChange(e.target.value)}
              placeholder={extraInput.placeholder}
              rows={3}
              className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-soft)]"
            />
          </div>
        )}

        <div className="mt-4">
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Type <span className="font-mono font-bold text-foreground">{confirmWord}</span> to confirm
          </label>
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={confirmWord}
            className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-soft)]"
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium transition hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            disabled={!matches}
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40 ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailModal({
  item,
  onClose,
  onApprove,
  onReject,
  onDelete,
}: {
  item: Submission;
  onClose: () => void;
  onApprove: (s: Submission) => void;
  onReject: (s: Submission, reason: string) => void;
  onDelete: (s: Submission) => void;
}) {
  const [confirmAction, setConfirmAction] = useState<"approve" | "reject" | "delete" | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const rows: Array<[string, string]> = [
    ["Status", item.status],
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
  if (item.status === "rejected" && item.reject_reason) {
    rows.push(["Reject Reason", item.reject_reason]);
  }

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
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl font-bold">{item.full_name}</h2>
            <StatusBadge status={item.status} />
          </div>
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

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 border-b border-border bg-secondary/30 p-4">
          <button
            onClick={() => setConfirmAction("approve")}
            disabled={item.status === "approved"}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            ✓ Approve
          </button>
          <button
            onClick={() => {
              setRejectReason("");
              setConfirmAction("reject");
            }}
            disabled={item.status === "rejected"}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            ✕ Reject
          </button>
          <button
            onClick={() => setConfirmAction("delete")}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50"
          >
            🗑 Delete
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
                ) : k === "Status" ? (
                  <span className="capitalize">{v}</span>
                ) : (
                  v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {confirmAction === "approve" && (
        <ConfirmDialog
          title="Approve application"
          description={`This will mark ${item.full_name} as approved and send an email.`}
          confirmWord="APPROVE"
          confirmLabel="Confirm Approve"
          confirmClass="bg-emerald-600 hover:bg-emerald-700"
          onCancel={() => setConfirmAction(null)}
          onConfirm={() => {
            setConfirmAction(null);
            onApprove(item);
          }}
        />
      )}
      {confirmAction === "reject" && (
        <ConfirmDialog
          title="Reject application"
          description={`This will mark ${item.full_name} as rejected and send a rejection email.`}
          confirmWord="REJECT"
          confirmLabel="Confirm Reject"
          confirmClass="bg-red-600 hover:bg-red-700"
          extraInput={{
            label: "Reason (optional)",
            placeholder: "Reason for rejection...",
            value: rejectReason,
            onChange: setRejectReason,
          }}
          onCancel={() => setConfirmAction(null)}
          onConfirm={() => {
            setConfirmAction(null);
            onReject(item, rejectReason.trim());
          }}
        />
      )}
      {confirmAction === "delete" && (
        <ConfirmDialog
          title="Delete submission"
          description={`This will permanently delete ${item.full_name}'s submission. This cannot be undone.`}
          confirmWord="DELETE"
          confirmLabel="Confirm Delete"
          confirmClass="bg-red-700 hover:bg-red-800"
          onCancel={() => setConfirmAction(null)}
          onConfirm={() => {
            setConfirmAction(null);
            onDelete(item);
          }}
        />
      )}
    </div>
  );
}

function SettingsModal({
  settings,
  onClose,
  onSave,
}: {
  settings: EmailSettings;
  onClose: () => void;
  onSave: (s: EmailSettings) => void;
}) {
  const [draft, setDraft] = useState<EmailSettings>(settings);

  function update<K extends keyof EmailSettings>(k: K, v: EmailSettings[K]) {
    setDraft((p) => ({ ...p, [k]: v }));
  }

  const fieldCls =
    "w-full rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-soft)]";
  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground";

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="animate-fade-up my-8 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="font-display text-xl font-bold">EmailJS Settings</h2>
            <p className="mt-1 text-xs text-muted-foreground">Stored locally in your browser</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground hover:bg-secondary" aria-label="Close">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className={labelCls}>Public Key</label>
            <input className={fieldCls} value={draft.publicKey} onChange={(e) => update("publicKey", e.target.value)} placeholder="xxxxxxxxxxxxxx" />
          </div>
          <div>
            <label className={labelCls}>Service ID</label>
            <input className={fieldCls} value={draft.serviceId} onChange={(e) => update("serviceId", e.target.value)} placeholder="service_xxxxxxx" />
          </div>
          <div>
            <label className={labelCls}>Approve Template ID</label>
            <input className={fieldCls} value={draft.approveTemplateId} onChange={(e) => update("approveTemplateId", e.target.value)} placeholder="template_xxxxxxx" />
          </div>
          <div>
            <label className={labelCls}>Reject Template ID</label>
            <input className={fieldCls} value={draft.rejectTemplateId} onChange={(e) => update("rejectTemplateId", e.target.value)} placeholder="template_xxxxxxx" />
          </div>

          <div className="rounded-xl border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Template variables:</p>
            <p className="mt-1">
              Approve: <code className="font-mono">{`{{name}}`}</code>, <code className="font-mono">{`{{to_email}}`}</code>
            </p>
            <p>
              Reject: <code className="font-mono">{`{{name}}`}</code>, <code className="font-mono">{`{{to_email}}`}</code>, <code className="font-mono">{`{{reason}}`}</code>
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border bg-secondary/30 p-4">
          <button onClick={onClose} className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium transition hover:bg-secondary">
            Cancel
          </button>
          <button
            onClick={() => onSave(draft)}
            className="group relative overflow-hidden rounded-lg bg-foreground px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(212,175,55,0.5)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-[var(--gradient-gold)] transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
