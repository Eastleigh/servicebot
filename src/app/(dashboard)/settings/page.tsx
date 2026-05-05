"use client";

import { useState } from "react";
import { Bot, Key, Bell, CreditCard, Users, Globe } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "ai", label: "AI Chatbot", icon: Bot },
    { id: "integrations", label: "Integrations", icon: Key },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "team", label: "Team", icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted text-sm mt-1">
          Configure your ServiceBot account
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-48 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-gray-50 hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-xl border border-border p-6">
          {activeTab === "general" && <GeneralSettings />}
          {activeTab === "ai" && <AISettings />}
          {activeTab === "integrations" && <IntegrationSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "billing" && <BillingSettings />}
          {activeTab === "team" && <TeamSettings />}
        </div>
      </div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">
        Business Information
      </h2>
      <div className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Business Name
          </label>
          <input
            type="text"
            defaultValue="Austin HVAC Pros"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            defaultValue="(555) 000-1234"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Service Area
          </label>
          <input
            type="text"
            defaultValue="Austin, TX metro area"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Industry
          </label>
          <select
            defaultValue="hvac"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="hvac">HVAC</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="cleaning">Cleaning</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function AISettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">
        AI Chatbot Configuration
      </h2>
      <div className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            OpenAI API Key
          </label>
          <input
            type="password"
            placeholder="sk-..."
            className="w-full px-3 py-2 border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <p className="text-xs text-muted mt-1">
            Required for AI chatbot functionality
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Chatbot Personality
          </label>
          <textarea
            defaultValue="You are a friendly and professional HVAC service assistant. You help customers schedule repairs, maintenance, and installations. Always be helpful, provide pricing estimates when possible, and try to book an appointment."
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Services & Pricing
          </label>
          <textarea
            defaultValue={`AC Repair: $89 diagnostic + repair costs\nAC Installation: Starting at $3,000\nFurnace Repair: $89 diagnostic + repair costs\nDuct Cleaning: $400-$800\nMaintenance Plan: $250/year per unit\nSmart Thermostat Install: $150 labor + device`}
            rows={6}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-foreground">
              Auto-book appointments
            </p>
            <p className="text-xs text-muted">
              Let AI book appointments without human approval
            </p>
          </div>
          <button className="w-10 h-6 bg-primary rounded-full relative">
            <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
          </button>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-foreground">
              Lead follow-up
            </p>
            <p className="text-xs text-muted">
              Automatically follow up on unresponsive leads
            </p>
          </div>
          <button className="w-10 h-6 bg-primary rounded-full relative">
            <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
          </button>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
          Save AI Settings
        </button>
      </div>
    </div>
  );
}

function IntegrationSettings() {
  const integrations = [
    {
      name: "Twilio",
      description: "SMS & phone call integration",
      connected: false,
    },
    {
      name: "Stripe",
      description: "Payment processing",
      connected: false,
    },
    {
      name: "Facebook",
      description: "Messenger chatbot integration",
      connected: false,
    },
    {
      name: "Google Calendar",
      description: "Sync appointments",
      connected: false,
    },
    {
      name: "QuickBooks",
      description: "Accounting sync",
      connected: false,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">Integrations</h2>
      <div className="space-y-3">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="flex items-center justify-between p-4 border border-border rounded-lg"
          >
            <div>
              <p className="font-medium text-foreground">
                {integration.name}
              </p>
              <p className="text-sm text-muted">{integration.description}</p>
            </div>
            <button
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                integration.connected
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-foreground hover:bg-gray-200"
              }`}
            >
              {integration.connected ? "Connected" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
      <div className="space-y-3 max-w-lg">
        {[
          {
            label: "New lead notifications",
            desc: "Get notified when a new lead comes in",
          },
          {
            label: "Job status updates",
            desc: "Notifications when job status changes",
          },
          {
            label: "Payment received",
            desc: "Get notified when a payment is received",
          },
          {
            label: "Daily summary",
            desc: "Receive a daily summary of your business",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="text-sm font-medium text-foreground">
                {item.label}
              </p>
              <p className="text-xs text-muted">{item.desc}</p>
            </div>
            <button className="w-10 h-6 bg-primary rounded-full relative">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">
        Billing & Subscription
      </h2>
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg max-w-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Growth Plan</p>
            <p className="text-sm text-muted">$297/month</p>
          </div>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
            Active
          </span>
        </div>
        <div className="mt-3 text-sm text-muted">
          <p>Next billing date: June 1, 2025</p>
          <p>4-10 technicians &middot; Unlimited AI conversations</p>
        </div>
      </div>
      <button className="text-sm text-primary hover:underline">
        Manage subscription
      </button>
    </div>
  );
}

function TeamSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-foreground">Team Members</h2>
      <div className="space-y-3 max-w-lg">
        <div className="flex items-center justify-between p-3 border border-border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Admin User</p>
              <p className="text-xs text-muted">admin@hvacpro.com</p>
            </div>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">
            Owner
          </span>
        </div>
      </div>
      <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
        Invite Team Member
      </button>
    </div>
  );
}
