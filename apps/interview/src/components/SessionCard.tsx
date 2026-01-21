import React from 'react';
import { Clock, Play, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SessionCardProps {
    session: {
        _id: string;
        jdInfo: {
            role: string;
            techStack: string[];
        };
        status: 'active' | 'paused' | 'completed';
        createdAt: string;
        currentQuestionIndex?: number;
        allQuestions?: any[];
        finalReport?: {
            overallScore: number;
            recommendation: string;
        };
    };
    onContinue: (sessionId: string) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onContinue }) => {
    const router = useRouter();
    const isInProgress = session.status !== 'completed';
    const progress = session.currentQuestionIndex && session.allQuestions
        ? Math.round((session.currentQuestionIndex / session.allQuestions.length) * 100)
        : 0;

    return (
        <div onClick
            ={() => isInProgress ? onContinue(session._id) : router.push(`/report/${session._id}`)}
            className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-slate-900">{session.jdInfo.role}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${isInProgress
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                            {session.status}
                        </span>
                    </div>
                    <p className="text-sm text-slate-500">
                        {session.jdInfo.techStack?.slice(0, 3).join(', ')}
                    </p>
                </div>
                {!isInProgress && session.finalReport && (
                    <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{session.finalReport.overallScore}</div>
                        <div className="text-xs text-slate-500">Score</div>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                </div>

                {isInProgress ? (
                    <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-amber-600">{progress}% Complete</div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm">
                            Continue <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-bold text-sm group-hover:bg-blue-600 group-hover:text-white">
                        View Report <ChevronRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};
