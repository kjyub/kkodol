import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router';

export function useArrayParam(key: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const values = useMemo(() => {
    const raw = searchParams.get(key);
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams, key]);

  const value = useMemo(() => {
    return values[0];
  }, [values]);

  const setValues = useCallback(
    (nextVals: string[], opts?: { replace?: boolean }) => {
      const newSearchParams = new URLSearchParams(searchParams);
      const uniq = [...new Set(nextVals)]; // 중복 제거
      const newValues = uniq.join(',');

      if (newValues) newSearchParams.set(key, newValues);
      else newSearchParams.delete(key);

      // 히스토리 폭증 방지: 보통 replace 사용
      setSearchParams(newSearchParams, { replace: opts?.replace ?? true });
    },
    [key, searchParams, setSearchParams],
  );

  const toggle = useCallback(
    (v: string) => {
      const set = new Set(values);
      set.has(v) ? set.delete(v) : set.add(v);
      setValues([...set]);
    },
    [values, setValues],
  );

  const valueSet = useCallback(() => new Set(values), [values]);

  const clear = useCallback(() => setValues([]), [setValues]);

  const setMultiple = useCallback(
    (updates: Record<string, string[]>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([updateKey, nextVals]) => {
        const uniq = [...new Set(nextVals)]; // 중복 제거
        const newValues = uniq.join(',');

        if (newValues) newSearchParams.set(updateKey, newValues);
        else newSearchParams.delete(updateKey);
      });

      setSearchParams(newSearchParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  return { value, values, setValues, toggle, clear, valueSet, setMultiple };
}
