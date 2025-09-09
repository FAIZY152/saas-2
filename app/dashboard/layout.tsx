import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ServiceTracker } from "@/components/Optimization/ServiceTracker";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <ServiceTracker />
      {children}
    </ProtectedRoute>
  );
}