interface Metric {
    value: string;
    label: string;
    sublabel?: string;
    color: 'blue' | 'purple' | 'green' | 'orange';
}

interface SuccessMetricsProps {
    metrics: Metric[];
}

const colorClasses = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
};

export function SuccessMetrics({ metrics }: SuccessMetricsProps) {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 border-y border-blue-100">
            <div className="max-w-7xl mx-auto">
                <div className={`grid ${metrics.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-8 text-center`}>
                    {metrics.map((metric, index) => (
                        <div key={index} className="space-y-2">
                            <div className={`text-5xl font-extrabold ${colorClasses[metric.color]} mb-2`}>
                                {metric.value}
                            </div>
                            <div className="text-gray-900 font-semibold">
                                {metric.label}
                            </div>
                            {metric.sublabel && (
                                <div className="text-sm text-gray-500 mt-1">
                                    {metric.sublabel}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
