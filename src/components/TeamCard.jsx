export default function TeamCard({ member }) {
  const { name, image } = member;

  return (
    <article className="h-full flex flex-col bg-charcoal border border-inkborder/20 hover:border-gold transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 group overflow-hidden">
      {/* Square Portrait Container — identical aspect ratio across all cards */}
      <div className="relative w-full aspect-square overflow-hidden bg-surface border-b-2 border-gold/50 group-hover:border-gold transition-colors duration-300 flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-surface flex items-center justify-center">
            <span className="font-display text-5xl text-gold font-bold">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Highlighted Name Plate */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 bg-surface/80 group-hover:bg-gold/10 transition-colors duration-300 text-center">
        <div className="w-8 h-0.5 bg-gold mb-2 transition-all duration-300 group-hover:w-12" />
        <h3 className="font-display text-base sm:text-lg font-bold text-ivory group-hover:text-gold leading-snug tracking-wide transition-colors duration-200">
          {name}
        </h3>
      </div>
    </article>
  );
}
