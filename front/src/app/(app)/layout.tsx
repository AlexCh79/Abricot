export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <header className="bg-white">
                <nav aria-label="Menu principal" className="px-10 py-3">
                    Menu
                </nav>
            </header>

            <main className="flex-1 px-10 py-8">{children}</main>

            <footer className="bg-white px-10 py-6">Pied de Page</footer>
        </>
    );
}