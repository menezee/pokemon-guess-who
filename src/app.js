import { Header, Footer, Game } from "./components";
import PokemonContextProvider from "./components/context";

export default function App() {
  return (
    <>
      <PokemonContextProvider>
        <Header />
        <Game />
        <Footer />
      </PokemonContextProvider>
    </>
  );
}
