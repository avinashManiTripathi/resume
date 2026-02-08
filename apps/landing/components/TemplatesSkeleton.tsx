
export function TemplatesSkeleton() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col items-center justify-center mb-12 gap-6 text-center">
                    <div className="max-w-2xl w-full flex flex-col items-center">
                        <div className="h-8 w-48 bg-slate-200 rounded-full mb-6 animate-pulse" />
                        <div className="h-10 w-3/4 bg-slate-200 rounded-lg mb-4 animate-pulse" />
                        <div className="h-6 w-1/2 bg-slate-200 rounded-lg animate-pulse" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 h-[400px] flex flex-col gap-4 animate-pulse">
                            <div className="w-full h-48 bg-slate-100 rounded-lg" />
                            <div className="h-6 w-3/4 bg-slate-100 rounded" />
                            <div className="h-4 w-1/2 bg-slate-100 rounded" />
                            <div className="mt-auto h-10 w-full bg-slate-100 rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
