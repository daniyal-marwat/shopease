import { toast } from "sonner";
import { AlertTriangle, CheckCircle } from "lucide-react"; // or any icon you prefer

function toastMessage(
  message: string,
  type: "accomplishment" | "error" = "accomplishment"
) {
  const typeErrorJsx = (
    <div className="flex items-center gap-3 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg">
      <AlertTriangle className="w-5 h-5 text-white" />
      <span>{message}</span>
    </div>
  );
  const typeAccomplishmentJsx = (
    <div className="flex items-center gap-3 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg">
      <CheckCircle className="w-5 h-5 text-white" />
      <span>{message}</span>
    </div>
  );

  toast.custom(
    () => {
      return type === "accomplishment" ? typeAccomplishmentJsx : typeErrorJsx;
    },
    {
      duration: 4000,
    }
  );
}

export { toastMessage };
