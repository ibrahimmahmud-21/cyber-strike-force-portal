import { useNavigate } from "react-router-dom";
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
      <DialogContent className="max-h-[90vh] overflow-y-auto border border-[rgba(0,212,255,0.25)] bg-[#070d18] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-bangla text-center text-xl text-white">
            🛡️ CYBER STRIKE FORCE (CSF)
          </DialogTitle>
          <p className="font-bangla text-center text-sm text-muted-foreground">
            📋 আবেদন করার নিয়মাবলী
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-sm border border-[rgba(0,212,255,0.25)] border-l-[3px] border-l-[#00d4ff] bg-[rgba(8,14,26,0.7)] p-4 backdrop-blur">
            <p className="font-bangla text-sm font-semibold text-white">
              ⚠️ আবেদন করার আগে অবশ্যই পড়ুন:
            </p>
          </div>

          <ol className="font-bangla space-y-3 text-sm leading-relaxed text-foreground">
            {[
              "আপনার নাম অবশ্যই আপনার Facebook প্রোফাইলের নামের সাথে মিল থাকতে হবে।",
              "সব তথ্য সঠিক ও বাস্তব (অরিজিনাল) দিতে হবে।",
              "আপনি অন্য কোনো টিম বা গ্রুপের সদস্য হতে পারবেন না।",
              "একই Email বা Phone Number ব্যবহার করে একাধিকবার আবেদন করা যাবে না।",
            ].map((text, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-sm border border-[rgba(0,212,255,0.18)] bg-[rgba(10,16,28,0.6)] p-3 backdrop-blur transition hover:border-[rgba(0,212,255,0.45)] hover:bg-[rgba(0,212,255,0.05)]"
              >
                <span className="font-orbitron font-bold text-[#00d4ff]">
                  {["১", "২", "৩", "৪"][i]}.
                </span>
                <span className="text-[#cbd3e1]">{text}</span>
              </li>
            ))}
          </ol>

          <div className="note-cyber">
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
              navigate("/");
            }}
            className="font-bangla flex-1 rounded-md border border-[rgba(0,212,255,0.25)] bg-transparent px-6 py-3 text-sm font-medium text-muted-foreground transition hover:border-[#00d4ff] hover:text-[#00d4ff]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="font-orbitron group relative flex-1 overflow-hidden rounded-md px-6 py-3 text-xs font-bold uppercase tracking-[2px] text-[#03121a] transition hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#0078ff)",
              boxShadow: "0 8px 24px -8px rgba(0,212,255,0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <span className="relative">Continue</span>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
