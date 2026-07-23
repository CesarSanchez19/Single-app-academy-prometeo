export const pageClass =
  "relative flex min-h-screen min-h-dvh flex-col bg-[#e9edf2] font-['DM_Sans',system-ui,sans-serif] text-[#0e1520] antialiased";

export const backdropClass =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_0%,rgba(184,92,40,0.07),transparent_55%),radial-gradient(ellipse_50%_40%_at_90%_100%,rgba(14,21,32,0.04),transparent_50%)]";

export const headerClass = "relative z-[1] px-6 py-5 max-[480px]:p-4";

export const backButtonClass =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[rgba(14,21,32,0.08)] bg-[rgba(255,255,255,0.65)] px-3.5 py-2 pl-2.5 text-[13px] font-medium leading-none text-[#5a6a7e] transition-[color,background-color,border-color,transform] duration-150 hover:border-[rgba(14,21,32,0.14)] hover:bg-white hover:text-[#243044] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(184,92,40,0.35)] motion-reduce:transition-none motion-reduce:active:scale-100";

export const mainClass =
  "relative z-[1] flex flex-1 items-center justify-center px-5 pt-6 pb-12";

export const cardClass =
  "w-full max-w-[420px] rounded-2xl border border-[rgba(14,21,32,0.08)] bg-white p-10 shadow-[0_0_0_1px_rgba(14,21,32,0.03),0_1px_2px_-1px_rgba(14,21,32,0.06),0_8px_24px_-4px_rgba(14,21,32,0.08)] max-[480px]:rounded-xl max-[480px]:px-6 max-[480px]:py-7";

export const introClass = "mb-8";

export const eyebrowClass =
  "mb-3 block text-[11px] font-semibold tracking-[0.12em] text-[#b85c28] uppercase";

export const titleClass =
  "mb-2.5 font-['Fraunces',Georgia,serif] text-[28px] leading-[1.15] font-semibold tracking-[-0.02em] text-[#0e1520] text-balance max-[480px]:text-2xl";

export const descriptionClass =
  "text-sm leading-relaxed text-[#5a6a7e] text-pretty";

export const formClass = "flex flex-col gap-5";

export const fieldClass = "flex flex-col gap-2";

export const fieldRowClass = "flex items-baseline justify-between gap-3";

export const labelClass = "text-[13px] font-medium text-[#243044]";

export const inputClass =
  "w-full rounded-lg border border-[rgba(14,21,32,0.14)] bg-[#dfe5ec] px-3.5 py-[11px] font-['DM_Sans',system-ui,sans-serif] text-[15px] leading-snug text-[#0e1520] transition-[border-color,background-color,box-shadow] duration-150 placeholder:text-[#8d9aad] hover:border-[rgba(14,21,32,0.22)] focus:border-[#b85c28] focus:bg-white focus:shadow-[0_0_0_3px_rgba(184,92,40,0.1)] focus:outline-none motion-reduce:transition-none";

export const linkClass =
  "text-[13px] font-medium text-[#5a6a7e] no-underline transition-colors duration-150 hover:text-[#b85c28] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(184,92,40,0.35)] motion-reduce:transition-none";

export const linkAccentClass = `${linkClass} text-[#b85c28] hover:text-[#9a4a1f]`;

export const submitButtonClass =
  "mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border-none bg-[#0e1520] px-5 py-[13px] font-['DM_Sans',system-ui,sans-serif] text-[15px] leading-none font-semibold text-[#f7f8fa] transition-[background-color,transform,box-shadow] duration-150 hover:bg-[#243044] hover:shadow-[0_2px_8px_-2px_rgba(14,21,32,0.25)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(184,92,40,0.35)] motion-reduce:transition-none motion-reduce:active:scale-100";

export const footerClass = "mt-7 border-t border-[rgba(14,21,32,0.08)] pt-6";

export const footerTextClass = "text-center text-sm leading-normal text-[#5a6a7e]";

export const shellClass = pageClass;

export const shellInnerClass =
  "relative z-10 flex min-h-dvh w-full flex-col";

export const publicHeaderClass =
  "relative z-10 w-full shrink-0 border-b border-[rgba(14,21,32,0.08)] bg-[rgba(255,255,255,0.65)] px-6 py-4 backdrop-blur-md max-[480px]:px-4";

export const publicHeaderInnerClass =
  "mx-auto flex w-full max-w-[1120px] items-center justify-between gap-6";

export const brandLinkClass =
  "inline-flex flex-col gap-0.5 no-underline transition-opacity duration-150 hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(184,92,40,0.35)]";

export const brandEyebrowClass =
  "text-[10px] font-semibold tracking-[0.14em] text-[#b85c28] uppercase";

export const brandWordmarkClass =
  "font-['Fraunces',Georgia,serif] text-[22px] leading-none font-semibold tracking-[-0.02em] text-[#0e1520]";

export const publicNavClass = "flex flex-wrap items-center gap-16 max-[480px]:gap-4";

export const navLinkClass =
  "text-lg font-medium text-[#5a6a7e] no-underline transition-colors duration-150 hover:text-[#b85c28] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(184,92,40,0.35)] motion-reduce:transition-none";

export const navLinkActiveClass = `${navLinkClass} text-[#b85c28]`;

export const publicMainClass =
  "relative z-[1] mx-auto flex w-full max-w-[1120px] flex-1 flex-col items-center justify-center px-6 py-10 max-[480px]:px-4 max-[480px]:py-8";

export const publicFooterClass =
  "relative z-[1] mt-auto w-full shrink-0 border-t border-[rgba(14,21,32,0.08)] bg-[rgba(255,255,255,0.45)] px-6 py-8 backdrop-blur-md max-[480px]:px-4";

export const publicFooterInnerClass =
  "mx-auto flex w-full max-w-[1120px] flex-col items-center";

export const heroCardClass =
  "w-full max-w-[640px] rounded-2xl border border-[rgba(14,21,32,0.08)] bg-white p-10 text-center shadow-[0_0_0_1px_rgba(14,21,32,0.03),0_1px_2px_-1px_rgba(14,21,32,0.06),0_8px_24px_-4px_rgba(14,21,32,0.08)] max-[480px]:rounded-xl max-[480px]:px-6 max-[480px]:py-8";

export const pageCardClass =
  "w-full max-w-[640px] rounded-2xl border border-[rgba(14,21,32,0.08)] bg-white p-10 shadow-[0_0_0_1px_rgba(14,21,32,0.03),0_1px_2px_-1px_rgba(14,21,32,0.06),0_8px_24px_-4px_rgba(14,21,32,0.08)] max-[480px]:rounded-xl max-[480px]:px-6 max-[480px]:py-8";

export const statusPillClass =
  "inline-flex items-center justify-center rounded-lg border border-[rgba(14,21,32,0.08)] bg-[#dfe5ec] px-4 py-3 text-sm leading-snug text-[#243044]";

export const statusLoadingClass = "text-[#5a6a7e]";

export const statusSuccessClass = "font-medium text-[#1e6b3a]";

export const statusErrorClass = "font-medium text-[#b42318]";

export const actionsRowClass =
  "mt-8 flex flex-wrap items-center justify-center gap-3";

export const secondaryButtonClass =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[rgba(14,21,32,0.08)] bg-[rgba(255,255,255,0.65)] px-5 py-[13px] text-[15px] font-semibold leading-none text-[#243044] no-underline transition-[color,background-color,border-color,transform] duration-150 hover:border-[rgba(14,21,32,0.14)] hover:bg-white active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(184,92,40,0.35)] motion-reduce:transition-none motion-reduce:active:scale-100";

export const primaryButtonInlineClass =
  "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-lg border-none bg-[#0e1520] px-5 py-[13px] font-['DM_Sans',system-ui,sans-serif] text-[15px] leading-none font-semibold text-[#f7f8fa] no-underline transition-[background-color,transform,box-shadow] duration-150 hover:bg-[#243044] hover:shadow-[0_2px_8px_-2px_rgba(14,21,32,0.25)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(184,92,40,0.35)] motion-reduce:transition-none motion-reduce:active:scale-100";

export const passwordChecklistClass =
  "flex flex-col gap-1.5 rounded-lg border border-[rgba(14,21,32,0.08)] bg-[#f4f6f8] p-3";

export const passwordRuleClass =
  "flex items-center gap-2 text-[12px] leading-snug transition-colors duration-150";

export const passwordRulePassClass =
  "text-[#1e6b3a] font-medium";

export const passwordRuleFailClass =
  "text-[#8d9aad]";

export const successAlertClass =
  "text-[13px] font-medium p-3 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200";

export const errorAlertClass =
  "text-[13px] font-medium p-3 rounded-md bg-red-50 text-red-600 border border-red-100";

export const warningAlertClass =
  "text-[13px] font-medium p-3 rounded-md bg-amber-50 text-amber-800 border border-amber-200";

// --- Dashboard: shell ---

export const dashboardShellClass =
  "flex min-h-screen min-h-dvh bg-[#e9edf2] font-['DM_Sans',system-ui,sans-serif] text-[#0e1520] antialiased";

export const dashboardMainClass =
  "flex min-w-0 flex-1 flex-col";

export const dashboardPageWrapperClass =
  "mx-auto w-full max-w-[1200px] flex-1 p-6 max-[480px]:p-4";

// --- Dashboard: sidebar ---

export const dashboardSidebarClass =
  "sticky top-0 flex h-screen w-[260px] shrink-0 flex-col border-r border-[rgba(14,21,32,0.08)] bg-white";

export const dashboardSidebarHeaderClass =
  "border-b border-[rgba(14,21,32,0.08)] px-6 py-6";

export const dashboardSidebarBrandClass =
  "font-['Fraunces',Georgia,serif] text-xl font-semibold tracking-[-0.02em] text-[#0e1520]";

export const dashboardSidebarContentClass =
  "flex flex-1 flex-col overflow-y-auto p-4";

export const dashboardSidebarSectionClass = "mb-6";

export const dashboardSidebarSubtitleClass =
  "mb-2 px-3 text-[11px] font-semibold tracking-[0.1em] text-[#5a6a7e] uppercase";

export const dashboardSidebarNavClass = "flex flex-col gap-1";

export const dashboardSidebarLinkClass =
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#5a6a7e] no-underline transition-[color,background-color] duration-150 hover:bg-[#f4f6f8] hover:text-[#243044] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(184,92,40,0.35)] motion-reduce:transition-none";

export const dashboardSidebarLinkActiveClass =
  "bg-[rgba(184,92,40,0.1)] text-[#b85c28] hover:bg-[rgba(184,92,40,0.14)] hover:text-[#9a4a1f]";

export const dashboardSidebarFooterClass =
  "mt-auto border-t border-[rgba(14,21,32,0.08)] p-4";

export const dashboardLogoutButtonClass =
  "inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-[rgba(14,21,32,0.08)] bg-[rgba(255,255,255,0.65)] px-4 py-2.5 text-sm font-semibold leading-none text-[#243044] transition-[color,background-color,border-color,transform] duration-150 hover:border-[rgba(14,21,32,0.14)] hover:bg-white active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(184,92,40,0.35)] motion-reduce:transition-none motion-reduce:active:scale-100";
