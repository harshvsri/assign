import Spline from "@splinetool/react-spline";

function Hero() {
  return (
    <div className="relative hidden w-1/2 flex-col bg-muted text-white lg:flex dark:border-r">
      <div className="relative z-10 flex-1 h-full">
        <Spline scene="https://prod.spline.design/6OnD8aifdwwid57U/scene.splinecode" />
      </div>
    </div>
  );
}

export default Hero;
