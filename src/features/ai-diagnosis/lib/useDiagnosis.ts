import { useState, useEffect } from 'react';
import { getDiagnosis, type DiagnosisResult } from '../api/getDiagnosis';

export function useDiagnosis(assetId: string) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<DiagnosisResult | null>(null);
    const [error, setError] = useState(false);

    const load = () => {
        setLoading(true);
        setError(false);
        getDiagnosis(assetId)
            .then((data) => {
                setResult(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        load();
    }, [assetId]);

    return { loading, result, error, load };
}
