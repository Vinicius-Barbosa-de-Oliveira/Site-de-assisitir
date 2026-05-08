type Props = {
  number: number;
};

export default function EpisodeCard({ number }: Props) {
  return (
    <div className="bg-[#18181F] hover:bg-[#202028] transition rounded-2xl p-4">
      
      <div className="flex items-center gap-4">
        
        <div className="w-32 h-20 bg-zinc-700 rounded-xl" />

        <div className="flex-1 cursor-pointer">
          
          <h3 className="font-semibold">
            Episódio {number}
          </h3>

          <p className="text-zinc-400 text-sm mt-2">
            Legendado • Full HD
          </p>

        </div>

        <button className="bg-purple-500 w-12 h-12 rounded-full cursor-pointer">
          ▶
        </button>

      </div>

    </div>
  );
}