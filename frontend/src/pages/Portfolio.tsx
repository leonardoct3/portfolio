import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { Layout } from "./components/Layout";
import { 
  HomeSection, 
  AboutSection, 
  SkillsSection, 
  ProjectsSection, 
  ContactSection 
} from "./components/Sections";

export const Portfolio = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 50,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <Layout>
      {/* Particles background */}
      {init && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
          />
        </div>
      )}
      
      {/* Main content */}
      <div className="relative z-10">
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </Layout>
  );
};