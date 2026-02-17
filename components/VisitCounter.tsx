import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const VisitCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      // Increment visit count
      await supabase.rpc('increment_visits');

      // Read current count
      const { data } = await supabase
        .from('site_visits')
        .select('count')
        .eq('id', 1)
        .single();

      if (data) setCount(data.count);
    })();
  }, []);

  if (count === null) return null;

  return (
    <div className="fixed top-20 right-4 z-40 bg-white/80 backdrop-blur border border-stone-200 px-3 py-1.5 rounded-full shadow-sm">
      <span className="text-[10px] uppercase tracking-widest text-stone-400 mr-1.5">Visits</span>
      <span className="text-xs font-medium text-stone-700">{count.toLocaleString()}</span>
    </div>
  );
};

export default VisitCounter;
