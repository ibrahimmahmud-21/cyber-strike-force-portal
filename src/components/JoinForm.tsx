import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const inputCls =
  "font-bangla w-full rounded-xl border border-border bg-white px-4 py-3 text-foreground placeholder:text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-soft)]";

const labelCls = "font-bangla mb-2 block text-sm font-medium text-foreground";

const fileCls =
  "font-bangla w-full rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-foreground/90 cursor-pointer";

export function JoinForm() {
  const [loading, setLoading] = useState(false);

  async function uploadFile(file: File, bucket: string): Promise<string> {
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  async function uploadAll(files: File[], bucket: string): Promise<string[]> {
    return Promise.all(files.map((f) => uploadFile(f, bucket)));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const fd = new FormData(form);

      const photoFiles = (fd.getAll("photo") as File[]).filter((f) => f && f.size > 0);
      const idFiles = (fd.getAll("id_card") as File[]).filter((f) => f && f.size > 0);

      if (photoFiles.length === 0) throw new Error("আপনার ছবি আপলোড করুন");
      if (idFiles.length === 0) throw new Error("পরিচয়পত্র আপলোড করুন");

      const [photo_url, id_card_url] = await Promise.all([
        uploadAll(photoFiles, "csf-photos"),
        uploadAll(idFiles, "csf-ids"),
      ]);

      const motivationRaw = String(fd.get("motivation") ?? "").trim();

      const { error } = await supabase.from("submissions").insert({
        full_name: String(fd.get("full_name")),
        email: String(fd.get("email")),
        father_name: String(fd.get("father_name")),
        mobile: String(fd.get("mobile")),
        address: String(fd.get("address")),
        education: String(fd.get("education")),
        motivation: motivationRaw || null,
        date_of_birth: String(fd.get("date_of_birth")),
        nid_number: String(fd.get("nid_number")),
        gender: String(fd.get("gender")),
        whatsapp: String(fd.get("whatsapp")),
        facebook_link: String(fd.get("facebook_link")),
        photo_url,
        id_card_url,
      });

      if (error) throw error;

      toast.success("সফলভাবে সাবমিট হয়েছে");
      form.reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "একটি সমস্যা হয়েছে";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelCls}>আপনার পুরো নাম *</label>
        <input name="full_name" required maxLength={120} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>ইমেইল ঠিকানা *</label>
        <input name="email" type="email" required maxLength={160} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>পিতার নাম *</label>
        <input name="father_name" required maxLength={120} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>মোবাইল নাম্বার *</label>
        <input name="mobile" required maxLength={20} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>বর্তমান ঠিকানা *</label>
        <textarea name="address" required maxLength={400} rows={3} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>শিক্ষাগত যোগ্যতা *</label>
        <input name="education" required maxLength={160} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>আপনি কেন যোগ দিতে চান</label>
        <textarea name="motivation" maxLength={1000} rows={4} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>জন্ম তারিখ *</label>
        <input name="date_of_birth" type="date" required className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>এনআইডি / জন্ম নিবন্ধন নাম্বার *</label>
        <input name="nid_number" required maxLength={40} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>লিঙ্গ *</label>
        <select name="gender" required className={inputCls} defaultValue="">
          <option value="" disabled>
            নির্বাচন করুন
          </option>
          <option value="পুরুষ">পুরুষ</option>
          <option value="নারী">নারী</option>
        </select>
      </div>

      <div>
        <label className={labelCls}>হোয়াটসঅ্যাপ নাম্বার *</label>
        <input name="whatsapp" required maxLength={20} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>ফেসবুক লিংক *</label>
        <input name="facebook_link" type="url" required maxLength={300} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>আপনার সাম্প্রতিক ছবি *</label>
        <input name="photo" type="file" accept="image/*" multiple required className={fileCls} />
      </div>

      <div>
        <label className={labelCls}>পরিচয়পত্র (NID বা ID Card) *</label>
        <input name="id_card" type="file" accept="image/*" multiple required className={fileCls} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="font-bangla group relative mt-2 inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-foreground px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(212,175,55,0.55)] disabled:opacity-60 disabled:hover:translate-y-0"
      >
        <span className="absolute inset-0 -translate-x-full bg-[var(--gradient-gold)] transition-transform duration-500 group-hover:translate-x-0" />
        <span className="relative">{loading ? "অপেক্ষা করুন..." : "সাবমিট করুন"}</span>
      </button>
    </form>
  );
}
