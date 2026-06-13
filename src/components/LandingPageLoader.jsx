import React from 'react';

const shimmerClass = 'animate-pulse rounded-2xl bg-white/10';

const LandingPageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] px-4 text-white">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-white/10" />
          <div className="space-y-3">
            <div className="h-4 w-40 rounded-full bg-white/10" />
            <div className="h-3 w-64 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-5">
            <div className="h-4 w-28 rounded-full bg-white/10" />
            <div className="h-12 w-11/12 rounded-2xl bg-white/10" />
            <div className="h-5 w-full rounded-full bg-white/10" />
            <div className="h-5 w-10/12 rounded-full bg-white/10" />
            <div className="flex flex-wrap gap-3 pt-3">
              <div className="h-12 w-40 rounded-full bg-white/10" />
              <div className="h-12 w-36 rounded-full bg-white/10" />
              <div className="h-12 w-36 rounded-full bg-white/10" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={shimmerClass} style={{ height: '120px' }} />
            <div className={shimmerClass} style={{ height: '120px' }} />
            <div className={shimmerClass} style={{ height: '120px' }} />
            <div className={shimmerClass} style={{ height: '120px' }} />
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="h-48 rounded-3xl bg-white/10" />
          <div className="h-48 rounded-3xl bg-white/10" />
          <div className="h-48 rounded-3xl bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export default LandingPageLoader;
