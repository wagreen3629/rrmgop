import Header from "./components/Header";
import ChapterScroll from "./components/ChapterScroll";
import StatsBar from "./components/StatsBar";
import Mission from "./components/Mission";
import Values from "./components/Values";
import Donate from "./components/Donate";
import Shop from "./components/Shop";
import GetInvolved from "./components/GetInvolved";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ChapterScroll />
        <StatsBar />
        <Mission />
        <Values />
        <Donate />
        <Shop />
        <GetInvolved />
      </main>
      <Footer />
    </div>
  );
}
