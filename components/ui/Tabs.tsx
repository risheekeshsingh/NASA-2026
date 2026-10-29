"use client";

import React, { createContext, useContext, useId } from "react";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be rendered inside <Tabs />");
  }
  return context;
}

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className = "" }: TabsProps) {
  const baseId = useId();

  return (
    <TabsContext.Provider value={{ activeTab: value, setActiveTab: onValueChange, baseId }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabListProps {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function TabList({ children, className = "", "aria-label": ariaLabel }: TabListProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel || "Navigation tabs"}
      className={`inline-flex items-center gap-1.5 p-1 rounded-xl bg-space-950/70 border border-space-800 ${className}`}
    >
      {children}
    </div>
  );
}

export interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function TabTrigger({ value, children, className = "", icon }: TabTriggerProps) {
  const { activeTab, setActiveTab, baseId } = useTabsContext();
  const isSelected = activeTab === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <button
      role="tab"
      id={tabId}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => setActiveTab(value)}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ember-500 ${
        isSelected
          ? "bg-gradient-to-r from-ember-600 to-amber-600 text-white shadow-ember-glow font-semibold"
          : "text-slate-400 hover:text-slate-200 hover:bg-space-850/80"
      } ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
}

export interface TabContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabContent({ value, children, className = "" }: TabContentProps) {
  const { activeTab, baseId } = useTabsContext();
  const isSelected = activeTab === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  if (!isSelected) return null;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={`pt-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ember-500 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}
