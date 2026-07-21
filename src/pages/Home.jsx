import ChapterScroll from "../components/ChapterScroll";
import StatsBar from "../components/StatsBar";
import Mission from "../components/Mission";
import Values from "../components/Values";
import Donate from "../components/Donate";
import GetInvolved from "../components/GetInvolved";

export default function Home() {
  return (
    <>
      <ChapterScroll />
      <StatsBar />
      <Mission />
      <Values />
      <Donate />
      <GetInvolved />
    </>
  );
}
