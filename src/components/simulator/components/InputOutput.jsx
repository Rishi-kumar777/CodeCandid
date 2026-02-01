export default function InputOutput({ inputArr, setInputArr, outputArr }) {
    return (
        <div className="max-w-[1400px] mx-auto px-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Input</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Comma-separated integers</div>
                    <textarea
                        value={inputArr.join(",")}
                        onChange={(e) => {
                            const raw = e.target.value;

                            // Allow empty editing without instantly killing visualization:
                            if (raw.trim() === "") {
                                setInputArr([]);
                                return;
                            }

                            const nums = raw
                                .split(",")
                                .map((x) => x.trim())
                                .filter((x) => x.length > 0)
                                .map((x) => Number(x))
                                .filter((x) => Number.isFinite(x));

                            setInputArr(nums);
                        }}
                        className="mt-3 w-full min-h-[90px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm"
                    />

                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Output</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Based on selected algorithm</div>
                    <div className="mt-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-3 text-sm">
                        {outputArr?.length ? outputArr.join(", ") : <span className="text-zinc-500">—</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
