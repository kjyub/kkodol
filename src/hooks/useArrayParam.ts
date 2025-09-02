import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router';

export function useArrayParam(key: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const values = useMemo(() => {
    const raw = searchParams.get(key);
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams, key]);

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

  return { values, setValues, toggle, clear, valueSet };
}
