"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { IJobApplication, IFile, IApplicationsMeta } from "@/app/internal/libs/applications";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { 
    User, 
    Mail, 
    Phone, 
    Briefcase, 
    MapPin, 
    Calendar, 
    FileText, 
    MessageSquare,
    Link as LinkIcon
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortOrder = "desc" | "asc";

interface FetchState {
    data: IJobApplication[];
    meta: IApplicationsMeta | null;
    loading: boolean;
    error: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://cms.senkoun.co.uk";

function resolveUrl(url: string) {
    return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FileLink({ file, label }: { file: IFile | null; label: string }) {
    if (!file) return <span style={{ color: "#9ca3af", fontSize: "0.8rem" }}>—</span>;
    const url = resolveUrl(file.url);
    const isPdf = file.ext === ".pdf";
    return (
        <span style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", alignItems: "center" }} onClick={(e) => e.stopPropagation()}>
            <a href={url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                {file.name} ↗
            </a>
            {isPdf && (
                <a href={url} target="_blank" rel="noopener noreferrer" style={previewBadge}>
                    PDF Preview
                </a>
            )}
        </span>
    );
}

function ApplicationRow({ app, onClick }: { app: IJobApplication, onClick: (app: IJobApplication) => void }) {
    const name = `${app.first_name} ${app.last_name}`.trim();
    const date = new Date(app.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
    });
    return (
        <tr 
            onClick={() => onClick(app)}
            style={{ borderBottom: "1px solid #f3f4f6", cursor: "pointer", transition: "background-color 0.15s" }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
            <td style={tdStyle}>
                <div style={{ fontWeight: 600, color: "#111" }}>{name}</div>
                <div style={mutedSm}>{app.email}</div>
                <div style={mutedSm}>{app.phone}</div>
            </td>
            <td style={tdStyle}>
                <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>{app.job?.title ?? "—"}</div>
                <div style={mutedSm}>{app.job?.job_type} · {app.job?.work_type}</div>
                {app.job?.home && <div style={mutedSm}>{app.job.home.name}</div>}
            </td>
            <td style={tdStyle}>
                <div style={{ fontSize: "0.82rem", color: "#374151" }}>{app.hear_about_vacancy || "—"}</div>
            </td>
            <td style={tdStyle}><FileLink file={app.resume} label="Resume" /></td>
            <td style={tdStyle}><FileLink file={app.cover_letter} label="Cover Letter" /></td>
            <td style={{ ...tdStyle, color: "#6b7280", fontSize: "0.8rem", whiteSpace: "nowrap" }}>{date}</td>
        </tr>
    );
}

function Pagination({
    page, pageCount, onPage,
}: {
    page: number; pageCount: number; onPage: (p: number) => void;
}) {
    if (pageCount <= 1) return null;

    // Build page numbers: show first, last, current ±1, with ellipses
    const pages: (number | "…")[] = [];
    const add = new Set<number>();
    [1, pageCount, page - 1, page, page + 1].forEach((p) => {
        if (p >= 1 && p <= pageCount) add.add(p);
    });
    const sorted = [...add].sort((a, b) => a - b);
    sorted.forEach((p, i) => {
        if (i > 0 && p - sorted[i - 1] > 1) pages.push("…");
        pages.push(p);
    });

    return (
        <div style={{ display: "flex", gap: "0.35rem", alignItems: "center", justifyContent: "center", marginTop: "1.25rem" }}>
            <PagBtn label="←" disabled={page === 1} onClick={() => onPage(page - 1)} />
            {pages.map((p, i) =>
                p === "…"
                    ? <span key={`e${i}`} style={{ padding: "0 0.3rem", color: "#9ca3af" }}>…</span>
                    : <PagBtn key={p} label={String(p)} active={p === page} onClick={() => onPage(p)} />
            )}
            <PagBtn label="→" disabled={page === pageCount} onClick={() => onPage(page + 1)} />
        </div>
    );
}

function PagBtn({
    label, onClick, disabled, active,
}: {
    label: string; onClick: () => void; disabled?: boolean; active?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                padding: "0.35rem 0.65rem",
                borderRadius: "6px",
                border: "1px solid",
                borderColor: active ? "#1d4ed8" : "#d1d5db",
                background: active ? "#1d4ed8" : disabled ? "#f9fafb" : "#fff",
                color: active ? "#fff" : disabled ? "#9ca3af" : "#374151",
                cursor: disabled ? "default" : "pointer",
                fontSize: "0.85rem",
                fontWeight: active ? 600 : 400,
                lineHeight: 1,
            }}
        >
            {label}
        </button>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ApplicationsPage() {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState<SortOrder>("desc");
    const [state, setState] = useState<FetchState>({ data: [], meta: null, loading: true, error: null });
    const [selectedApp, setSelectedApp] = useState<IJobApplication | null>(null);

    // ── Debounce search ──────────────────────────────────────────────────────
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    function handleSearchChange(value: string) {
        setSearch(value);
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            setDebouncedSearch(value);
            setPage(1); // reset page on new search
        }, 400);
    }

    // ── Fetch ────────────────────────────────────────────────────────────────
    const fetchData = useCallback(async () => {
        setState((s) => ({ ...s, loading: true, error: null }));
        try {
            const params = new URLSearchParams({
                page: String(page),
                order,
                ...(debouncedSearch.trim() ? { q: debouncedSearch.trim() } : {}),
            });
            const res = await fetch(`/api/internal/applications?${params}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            setState({ data: json.data ?? [], meta: json.meta ?? null, loading: false, error: null });
        } catch (err) {
            setState((s) => ({ ...s, loading: false, error: (err as Error).message }));
        }
    }, [page, order, debouncedSearch]);

    useEffect(() => { fetchData(); }, [fetchData]);

    // ── Derived ───────────────────────────────────────────────────────────────
    const total = state.meta?.pagination?.total ?? 0;
    const pageCount = state.meta?.pagination?.pageCount ?? 0;

    return (
        <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif", maxWidth: "1400px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.2rem", color: "#111" }}>
                    Job Applications
                </h1>
                <p style={{ margin: 0, color: "#6b7280", fontSize: "0.875rem" }}>
                    {state.loading ? "Loading…" : `${total} application${total !== 1 ? "s" : ""}${debouncedSearch ? ` matching "${debouncedSearch}"` : ""}`}
                </p>
            </div>

            {/* Toolbar */}
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                {/* Search */}
                <div style={{ position: "relative", flex: "1 1 260px", maxWidth: "380px" }}>
                    <input
                        id="applications-search"
                        type="search"
                        placeholder="Search name, email, phone…"
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "0.5rem 0.75rem",
                            paddingRight: search ? "2rem" : "0.75rem",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            fontSize: "0.9rem",
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                {/* Sort toggle */}
                <button
                    id="sort-order-toggle"
                    onClick={() => { setOrder((o) => o === "desc" ? "asc" : "desc"); setPage(1); }}
                    title={order === "desc" ? "Showing newest first — click to show oldest first" : "Showing oldest first — click to show newest first"}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.5rem 0.9rem",
                        background: "#fff",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "0.875rem",
                        color: "#374151",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                    }}
                >
                    {order === "desc" ? "↓ Newest first" : "↑ Oldest first"}
                </button>
            </div>

            {/* Error */}
            {state.error && (
                <div style={{ background: "#fee2e2", color: "#991b1b", padding: "0.75rem 1rem", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.875rem" }}>
                    Failed to load applications: {state.error}
                </div>
            )}

            {/* Table */}
            <div style={{ overflowX: "auto", borderRadius: "8px", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", opacity: state.loading ? 0.55 : 1, transition: "opacity 0.15s" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
                    <thead>
                        <tr style={{ background: "#f9fafb", textAlign: "left" }}>
                            {["Applicant", "Position", "Heard via", "Resume", "Cover Letter", "Applied"].map((h) => (
                                <th key={h} style={thStyle}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {!state.loading && state.data.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>
                                    No applications found.
                                </td>
                            </tr>
                        ) : (
                            state.data.map((app) => <ApplicationRow key={app.id} app={app} onClick={setSelectedApp} />)
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!state.loading && pageCount > 1 && (
                <Pagination page={page} pageCount={pageCount} onPage={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
            )}

            {/* Page info */}
            {!state.loading && total > 0 && (
                <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.8rem", color: "#9ca3af" }}>
                    Page {page} of {pageCount} · {total} total
                </p>
            )}

            {/* Details Sheet */}
            <Sheet open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
                <SheetContent className="overflow-y-auto sm:max-w-lg bg-slate-50 p-0 border-l">
                    {selectedApp && (
                        <>
                            <div className="bg-white px-6 py-6 border-b sticky top-0 z-10">
                                <SheetHeader>
                                    <SheetTitle className="text-xl font-bold flex items-center gap-2">
                                        <User className="h-5 w-5 text-blue-600" />
                                        {selectedApp.first_name} {selectedApp.last_name}
                                    </SheetTitle>
                                    <SheetDescription className="flex items-center gap-1.5 mt-1.5">
                                        <Calendar className="h-4 w-4 text-slate-400" />
                                        Applied on {new Date(selectedApp.createdAt).toLocaleDateString("en-GB", {
                                            day: "numeric", month: "long", year: "numeric",
                                        })}
                                    </SheetDescription>
                                </SheetHeader>
                            </div>

                            <div className="flex flex-col gap-5 p-6">
                                {/* Contact Info Card */}
                                <div className="bg-white rounded-xl border p-5 shadow-sm space-y-4">
                                    <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-2">
                                        <Phone className="h-3.5 w-3.5" />
                                        Contact Information
                                    </h4>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <span className="text-xs text-slate-400 font-medium">Email Address</span>
                                            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                                <Mail className="h-4 w-4 text-slate-400" />
                                                <a href={`mailto:${selectedApp.email}`} className="hover:text-blue-600 transition-colors">{selectedApp.email}</a>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-xs text-slate-400 font-medium">Phone Number</span>
                                            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                                <Phone className="h-4 w-4 text-slate-400" />
                                                <a href={`tel:${selectedApp.phone}`} className="hover:text-blue-600 transition-colors">{selectedApp.phone}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Job Info Card */}
                                <div className="bg-white rounded-xl border p-5 shadow-sm space-y-4">
                                    <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-2">
                                        <Briefcase className="h-3.5 w-3.5" />
                                        Position Details
                                    </h4>
                                    <div>
                                        <div className="font-semibold text-slate-800 text-lg">
                                            {selectedApp.job?.title || "Unknown Position"}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 mt-2">
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                {selectedApp.job?.job_type || "N/A"}
                                            </span>
                                            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                                {selectedApp.job?.work_type || "N/A"}
                                            </span>
                                        </div>
                                        {selectedApp.job?.home && (
                                            <div className="flex items-start gap-2 mt-3 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                                <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="font-medium text-slate-700">{selectedApp.job.home.name}</div>
                                                    <div className="text-xs text-slate-500 mt-0.5">{selectedApp.job.home.address}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Documents Card */}
                                <div className="bg-white rounded-xl border p-5 shadow-sm space-y-4">
                                    <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-2">
                                        <FileText className="h-3.5 w-3.5" />
                                        Documents
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-100 p-2 rounded-md text-blue-600">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-700">Resume</div>
                                                    <div className="text-xs text-slate-400">{selectedApp.resume?.ext?.replace('.', '').toUpperCase() || "No file"} attached</div>
                                                </div>
                                            </div>
                                            <div>
                                                <FileLink file={selectedApp.resume} label="Open" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-indigo-100 p-2 rounded-md text-indigo-600">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-slate-700">Cover Letter</div>
                                                    <div className="text-xs text-slate-400">{selectedApp.cover_letter?.ext?.replace('.', '').toUpperCase() || "No file"} attached</div>
                                                </div>
                                            </div>
                                            <div>
                                                <FileLink file={selectedApp.cover_letter} label="Open" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Source & Responses Card */}
                                {(selectedApp.hear_about_vacancy || (selectedApp.responses && selectedApp.responses.length > 0)) && (
                                    <div className="bg-white rounded-xl border p-5 shadow-sm space-y-5">
                                        {selectedApp.hear_about_vacancy && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-2">
                                                    <LinkIcon className="h-3.5 w-3.5" />
                                                    Source
                                                </h4>
                                                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                    {selectedApp.hear_about_vacancy}
                                                </p>
                                            </div>
                                        )}

                                        {selectedApp.responses && selectedApp.responses.length > 0 && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-2">
                                                    <MessageSquare className="h-3.5 w-3.5" />
                                                    Form Responses
                                                </h4>
                                                <div className="rounded-lg bg-slate-900 p-4 overflow-x-auto shadow-inner">
                                                    <pre className="text-[13px] leading-relaxed text-emerald-400 font-mono">
                                                        {JSON.stringify(selectedApp.responses, null, 2)}
                                                    </pre>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </main>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
    padding: "0.65rem 1rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    borderBottom: "1px solid #e5e7eb",
};

const tdStyle: React.CSSProperties = {
    padding: "0.75rem 1rem",
    verticalAlign: "top",
};

const mutedSm: React.CSSProperties = {
    fontSize: "0.8rem",
    color: "#6b7280",
};

const linkStyle: React.CSSProperties = {
    color: "#1d4ed8",
    fontSize: "0.8rem",
    textDecoration: "underline",
    wordBreak: "break-all",
};

const previewBadge: React.CSSProperties = {
    display: "inline-block",
    padding: "0.1rem 0.4rem",
    background: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "4px",
    fontSize: "0.72rem",
    textDecoration: "none",
    whiteSpace: "nowrap",
};