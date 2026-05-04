import Home from "@/components/pages/Main/Home";

export default function MainPage() {
  return (
    // fix-s3-url-issue
    <div className="min-h-screen bg-background">
      <Home />
    </div>
  );
}
