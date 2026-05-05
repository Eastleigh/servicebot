import Link from "next/link";
import {
  Bot,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Zap,
  ArrowRight,
  Phone,
  MessageSquare,
  Globe,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-full">
      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                ServiceBot
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-muted hover:text-foreground transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              AI-Powered Service Business OS
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Book More Jobs.
              <br />
              <span className="text-primary">Automatically.</span>
            </h1>
            <p className="text-xl text-muted mb-8 leading-relaxed">
              The all-in-one platform for HVAC businesses. AI chatbot books
              appointments 24/7, CRM tracks every customer, and dispatch keeps
              your team organized.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need to Run Your Service Business
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Stop juggling spreadsheets, missed calls, and lost leads. ServiceBot
              handles it all.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="h-6 w-6" />}
              title="AI Booking Chatbot"
              description="Responds to leads instantly on your website, SMS, and Facebook. Qualifies customers and books appointments automatically."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Smart CRM"
              description="Track every customer, job, and conversation in one place. Pipeline view from new lead to paid invoice."
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Dispatch Dashboard"
              description="Calendar view with drag-and-drop scheduling. Assign jobs to the right technician at the right time."
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="Invoicing & Payments"
              description="Generate invoices after every job. Send Stripe payment links and track paid/unpaid status."
            />
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Business Reports"
              description="Revenue tracking, jobs completed, conversion rates. Know exactly how your business is performing."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="AI Automations"
              description="Auto-follow-up on missed leads, AI pricing suggestions, and smart upsells to increase revenue."
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Capture Leads From Every Channel
            </h2>
            <p className="text-lg text-muted">
              Your AI assistant works 24/7 across all platforms
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ChannelCard
              icon={<Globe className="h-8 w-8" />}
              title="Website Widget"
              description="Embed on your site. Visitors get instant responses."
            />
            <ChannelCard
              icon={<Phone className="h-8 w-8" />}
              title="SMS / Twilio"
              description="Text-based booking via your business phone number."
            />
            <ChannelCard
              icon={<MessageSquare className="h-8 w-8" />}
              title="Facebook Messenger"
              description="Capture leads from your Facebook page automatically."
            />
          </div>
        </div>
      </section>

      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Simple Pricing for Growing Businesses
          </h2>
          <p className="text-primary-light text-lg mb-12">
            Start free. Scale when you&apos;re ready.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              plan="Starter"
              price="$97"
              period="/month"
              features={[
                "1-3 technicians",
                "AI chatbot (website)",
                "CRM & pipeline",
                "Basic dispatch",
                "50 AI conversations/mo",
              ]}
            />
            <PricingCard
              plan="Growth"
              price="$297"
              period="/month"
              featured
              features={[
                "4-10 technicians",
                "AI chatbot (all channels)",
                "Advanced CRM",
                "Full dispatch",
                "Invoicing & payments",
                "Unlimited AI conversations",
                "Reports & analytics",
              ]}
            />
            <PricingCard
              plan="Agency"
              price="$997"
              period="/month"
              features={[
                "Unlimited technicians",
                "White-label branding",
                "API access",
                "Priority support",
                "Custom integrations",
                "Multi-location",
              ]}
            />
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary-light" />
              <span className="text-white font-bold">ServiceBot</span>
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} ServiceBot. Built for HVAC pros.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function ChannelCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted">{description}</p>
    </div>
  );
}

function PricingCard({
  plan,
  price,
  period,
  features,
  featured = false,
}: {
  plan: string;
  price: string;
  period: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-8 ${
        featured
          ? "bg-white text-foreground scale-105 shadow-2xl"
          : "bg-white/10 text-white"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-2 ${featured ? "text-primary" : ""}`}
      >
        {plan}
      </h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className={featured ? "text-muted" : "text-primary-light"}>
          {period}
        </span>
      </div>
      <ul className="space-y-3 text-left mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <div
              className={`w-1.5 h-1.5 rounded-full ${featured ? "bg-primary" : "bg-primary-light"}`}
            />
            <span className={`text-sm ${featured ? "text-muted" : ""}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className={`block text-center py-2.5 rounded-lg font-medium transition-colors ${
          featured
            ? "bg-primary text-white hover:bg-primary-dark"
            : "bg-white/20 text-white hover:bg-white/30"
        }`}
      >
        Get Started
      </Link>
    </div>
  );
}
