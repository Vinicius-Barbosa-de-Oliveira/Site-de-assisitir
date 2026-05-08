export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid md:grid-cols-4 gap-10">
          
          <div>
            <h2 className="text-2xl font-bold text-purple-400">
              Dorama
            </h2>

            <p className="text-zinc-400 mt-4">
              Sua plataforma moderna para assistir doramas.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Navegação
            </h3>

            <ul className="space-y-2 text-zinc-400">
              <li>Início</li>
              <li>Doramas</li>
              <li>Filmes</li>
              <li>Calendário</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Comunidade
            </h3>

            <ul className="space-y-2 text-zinc-400">
              <li>Comentários</li>
              <li>Rankings</li>
              <li>Notícias</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Redes
            </h3>

            <ul className="space-y-2 text-zinc-400">
              <li>Discord</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </div>

        </div>

      </div>

    </footer>
  );
}