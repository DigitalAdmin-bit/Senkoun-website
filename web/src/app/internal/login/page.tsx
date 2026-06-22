import { loginAction } from "../login-action";

interface Props {
    searchParams: Promise<{ error?: string }>;
}

export default async function InternalLoginPage({ searchParams }: Props) {
    const { error } = await searchParams;

    return (
        <main style={styles.main}>
            <div style={styles.card}>
                <h1 style={styles.title}>Internal Access</h1>
                <p style={styles.subtitle}>Senkoun staff only</p>

                {error && (
                    <p style={styles.error} role="alert">
                        Invalid username or password.
                    </p>
                )}

                <form action={loginAction} style={styles.form}>
                    <label style={styles.label} htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        style={styles.input}
                    />

                    <label style={styles.label} htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        style={styles.input}
                    />

                    <button type="submit" style={styles.button}>
                        Sign in
                    </button>
                </form>
            </div>
        </main>
    );
}

// Inline styles — keeps this a pure server component with zero extra deps.
const styles: Record<string, React.CSSProperties> = {
    main: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        fontFamily: "system-ui, sans-serif",
    },
    card: {
        background: "#fff",
        borderRadius: "8px",
        padding: "2.5rem 2rem",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "360px",
    },
    title: {
        margin: "0 0 0.25rem",
        fontSize: "1.4rem",
        fontWeight: 700,
        color: "#111",
    },
    subtitle: {
        margin: "0 0 1.5rem",
        fontSize: "0.875rem",
        color: "#666",
    },
    error: {
        background: "#fee2e2",
        color: "#991b1b",
        padding: "0.6rem 0.8rem",
        borderRadius: "6px",
        fontSize: "0.875rem",
        marginBottom: "1rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    },
    label: {
        fontSize: "0.8rem",
        fontWeight: 600,
        color: "#444",
        marginBottom: "0.2rem",
    },
    input: {
        width: "100%",
        padding: "0.6rem 0.75rem",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "0.95rem",
        outline: "none",
        boxSizing: "border-box",
    },
    button: {
        marginTop: "0.5rem",
        padding: "0.7rem",
        background: "#1d4ed8",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontSize: "1rem",
        fontWeight: 600,
        cursor: "pointer",
    },
};
