import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface RulesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}

export function RulesDialog({ open, onOpenChange, onContinue }: RulesDialogProps) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-bangla text-center text-xl">
            🛡️ CYBER STRIKE FORCE (CSF)
          </DialogTitle>
          <p className="font-bangla text-center text-sm text-muted-foreground">
            📋 আবেদন করার নিয়মাবলী
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--gold)]/40 bg-[var(--gold-soft)]/30 p-4">
            <p className="font-bangla text-sm font-semibold text-foreground">
              ⚠️ আবেদন করার আগে অবশ্যই পড়ুন:
            </p>
          </div>

          <ol className="font-bangla space-y-3 text-sm leading-relaxed text-foreground">
            <li className="flex gap-3">
              <span className="font-semibold text-[var(--gold-deep)]">১.</span>
              <span>আপনার নাম অবশ্যই আপনার Facebook প্রোফাইলের নামের সাথে মিল থাকতে হবে।</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-[var(--gold-deep)]">২.</span>
              <span>সব তথ্য সঠিক ও বাস্তব (অরিজিনাল) দিতে হবে।</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-[var(--gold-deep)]">৩.</span>
              <span>আপনি অন্য কোনো টিম বা গ্রুপের সদস্য হতে পারবেন না।</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-[var(--gold-deep)]">৪.</span>
              <span>একই Email বা Phone Number ব্যবহার করে একাধিকবার আবেদন করা যাবে না।</span>
            </li>
          </ol>

          <div className="rounded-xl border border-border bg-secondary/40 p-4">
            <p className="font-bangla text-sm font-semibold text-foreground">ℹ️ নোট:</p>
            <p className="font-bangla mt-1 text-sm text-muted-foreground">
              Admin যদি আপনার আবেদন Reject বা Delete করে, সেটি স্ক্যাম হিসেবে ধরা হবে না। আপনি
              পুনরায় আবেদন করতে পারবেন।
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              navigate({ to: "/" });
            }}
            className="font-bangla flex-1 rounded-xl border border-border bg-white px-6 py-3 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="font-bangla group relative flex-1 overflow-hidden rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 -translate-x-full bg-[var(--gradient-gold)] transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">Continue</span>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
