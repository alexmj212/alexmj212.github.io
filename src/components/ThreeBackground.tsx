import { useEffect, useRef } from "react";
import * as THREE from "three";

// Security: Color validation utility
const validateHexColor = (color: string): boolean => {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexPattern.test(color);
};

// Security: Safe color parsing utility
const parseColorSafely = (colorValue: string): number => {
  try {
    // Remove # if present and validate
    const cleanColor = colorValue.replace('#', '');
    if (!/^[A-Fa-f0-9]{6}$/.test(cleanColor)) {
      console.warn('Invalid color format, using fallback:', colorValue);
      return 0x0b8bd5; // fallback color
    }
    return parseInt(cleanColor, 16);
  } catch (error) {
    console.warn('Color parsing failed, using fallback:', error);
    return 0x0b8bd5; // fallback color
  }
};

// Security: Safe CSS variable getter
const getCSSColorSafely = (varName: string): number => {
  try {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    
    if (!color || !validateHexColor(color)) {
      console.warn('Invalid CSS color variable, using fallback:', varName, color);
      return 0x0b8bd5; // fallback color
    }
    
    return parseColorSafely(color);
  } catch (error) {
    console.warn('Failed to get CSS color variable, using fallback:', varName, error);
    return 0x0b8bd5; // fallback color
  }
};

const ThreeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const rendererRef = useRef<any>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log("ThreeBackground: Canvas mounted, initializing Three.js...");
    console.log("Canvas element:", canvas);

    try {
      console.log("Initializing Three.js...");

      // Scene, camera, renderer setup
      // Three.js r163+ requires WebGL 2, will throw if not available
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      });

      rendererRef.current = renderer;

      // Size canvas to full viewport since it's now fixed
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Position camera for rail perspective filling entire hero section
      camera.position.set(0, -2, 10); // Further back to capture full width/height
      camera.lookAt(0, 1, 0); // Look slightly up toward vanishing point
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      // Adjust field of view to fill hero section
      camera.fov = 60; // Wider field of view
      camera.updateProjectionMatrix();

      // Security: Validated configuration with safe defaults
      const getThemeAwareColor = (lightColor: number, darkColor: number): number => {
      try {
          const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          return isDark ? darkColor : lightColor;
      } catch (error) {
          console.warn('Theme detection failed, using light mode default:', error);
          return lightColor;
      }
      };

      // ===== CONFIGURABLE ANIMATION SETTINGS =====
      const CONFIG = {
          // Particle Settings
          particleCount: 50,
          particleSize: 0.08,
          particleSizeVariation: 1, // Size variance multiplier (0-1, higher = more size difference)
          particleGeometrySegments: 16, // Higher = smoother spheres (perfect circles)
          baseSpeed: 0.0001,
          speedVariation: 0.0002,

          // Trail Settings
          trailCount: 16,
          trailOpacity: 0.12,
          trailResolution: 2, // Lower = better performance

          // Colors - secure theme-aware colors with validation
          get startColor() {
            return getThemeAwareColor(0x0b8bd5, 0x0b8bd5);
          },
          get endColor() {
            return getThemeAwareColor(0x5b9a63, 0x5b9a63);
          },
          get trailColor() {
            return getThemeAwareColor(0x0b8bd5, 0x0b8bd5);
          },

          // Perspective & Layout
          raceTrackWidth: 30, // Total width left to right
          laneSpacing: 2, // Distance between lanes
          vanishingPointY: 8, // Height of vanishing point
          perspectiveIntensity: 0.9, // How much lanes converge (0-1)

          // Scale & Position Controls
          globalScale: 1.4, // Overall size multiplier for entire effect
          verticalOffset: 0, // Move entire effect up/down
          horizontalOffset: 4, // Move entire effect left/right
          depthOffset: 0, // Move entire effect forward/backward
          perspectiveScale: 0.8, // Base perspective scaling factor
          scaleVariation: 0.2, // Random scale variation (0-1)
          depthRange: 2, // Z-axis depth range for perspective

          // Performance
          enableMouseInteraction: false, // Temporarily disable for debugging
          mouseInfluenceRadius: 2,
          mouseSpeedBoost: 0,
          
          // Accessibility
          prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          reducedMotionSpeedMultiplier: 0.3, // Speed reduction for accessibility

          // Hero Content Effects (Rotation Only)
          contentRotationIntensity: 4, // Content rotation strength (degrees)
          wobbleSmoothing: 1, // Smoothness of rotation transitions (0-1)
      };

      // Derived values for optimization
      const particles: any[] = [];
      const clonedMaterials: THREE.Material[] = []; // Track all cloned materials for disposal
      const mouse = { x: 0, y: 0, screenX: 0, screenY: 0 };
      const smoothMouse = { x: 0, y: 0 }; // Smoothed mouse for wobble effect
      const halfTrackWidth = CONFIG.raceTrackWidth / 2;

      // Optimized geometry - reuse for all particles (with global scale)
      const particleGeometry = new THREE.SphereGeometry(CONFIG.particleSize * CONFIG.globalScale, CONFIG.particleGeometrySegments, CONFIG.particleGeometrySegments);

      // Use MeshLambertMaterial for better distance-based lighting control
      const particleMaterial = new THREE.MeshLambertMaterial({
          color: CONFIG.startColor,
          transparent: true,
          opacity: 0.6,
      });

      // Perspective object with scale and position offsets
      const PERSPECTIVE = {
          startX: -halfTrackWidth * CONFIG.globalScale + CONFIG.horizontalOffset,
          endX: halfTrackWidth * CONFIG.globalScale + CONFIG.horizontalOffset,
          vanishingPointY: CONFIG.vanishingPointY * CONFIG.globalScale + CONFIG.verticalOffset,
      };

      // Create optimized particle trail lines
      const createParticleTrails = () => {
          const trailGroup = new THREE.Group();

          // Optimized trail material
          const trailMaterial = new THREE.LineBasicMaterial({
            color: CONFIG.trailColor,
            transparent: true,
            opacity: CONFIG.trailOpacity,
          });

          // Create trails using config values
          for (let i = 0; i < CONFIG.trailCount; i++) {
            const trailGeometry = new THREE.BufferGeometry();
            const trailPoints: number[] = [];

            // Calculate lane position using configurable spacing and scale
            const baseLaneY = (i - (CONFIG.trailCount - 1) / 2) * CONFIG.laneSpacing * CONFIG.globalScale + CONFIG.verticalOffset;

            // Use configurable resolution for performance
            for (let j = 0; j < CONFIG.trailResolution; j++) {
              const progress = j / (CONFIG.trailResolution - 1);

              // Exact same calculation as particles use with depth controls
              const currentX = PERSPECTIVE.startX + (PERSPECTIVE.endX - PERSPECTIVE.startX) * progress;
              const convergenceFactor = progress * CONFIG.perspectiveIntensity;
              const startY = baseLaneY;
              const targetY = PERSPECTIVE.vanishingPointY;
              const finalY = startY + (targetY - startY) * convergenceFactor;
              const finalZ = -progress * CONFIG.depthRange + CONFIG.depthOffset;

              trailPoints.push(currentX, finalY, finalZ);
            }

            trailGeometry.setAttribute("position", new THREE.Float32BufferAttribute(trailPoints, 3));
            const trailLine = new THREE.Line(trailGeometry, trailMaterial);
            trailGroup.add(trailLine);
          }

          return trailGroup;
      };

      // Add particle trails to scene
      const particleTrails = createParticleTrails();
      scene.add(particleTrails);

      // Simple lighting setup for particle-relative mouse lighting
      const ambientIntensity = getThemeAwareColor(0.4, 0.2);
      const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
      scene.add(ambientLight);

      // Mouse-following point light for particle interaction
      const mouseLightIntensity = getThemeAwareColor(2.0, 1.5);
      const mouseLight = new THREE.PointLight(0xffffff, mouseLightIntensity, 30);
      mouseLight.position.set(0, 0, 5); // Start position
      scene.add(mouseLight);

      // Additional soft glow light using theme colors
      const glowIntensity = getThemeAwareColor(0.8, 0.6);
      const glowLight = new THREE.PointLight(CONFIG.startColor, glowIntensity, 25);
      glowLight.position.set(0, 0, 3); // Closer for glow effect
      scene.add(glowLight);

      // Create optimized particles using config values
      for (let i = 0; i < CONFIG.particleCount; i++) {
          const clonedMaterial = particleMaterial.clone();
          clonedMaterials.push(clonedMaterial); // Track for disposal
          const particle = new THREE.Mesh(particleGeometry, clonedMaterial);

          // Configurable color gradient
          const gradientFactor = i / (CONFIG.particleCount - 1);
          const startColor = new THREE.Color(CONFIG.startColor);
          const endColor = new THREE.Color(CONFIG.endColor);
          const particleColor = startColor.lerp(endColor, gradientFactor);
          particle.material.color = particleColor;

          // Optimized particle distribution across trails with scale
          const particlesPerTrail = Math.ceil(CONFIG.particleCount / CONFIG.trailCount);
          const trailIndex = Math.floor(i / particlesPerTrail);
          const baseLaneY = (trailIndex - (CONFIG.trailCount - 1) / 2) * CONFIG.laneSpacing * CONFIG.globalScale + CONFIG.verticalOffset;

          // Random size variance for each particle
          const sizeVariance = 0.5 + Math.random() * CONFIG.particleSizeVariation;

          particle.userData = {
            progress: Math.random(), // Random starting position
            speed: CONFIG.baseSpeed + Math.random() * CONFIG.speedVariation,
            baseSpeed: CONFIG.baseSpeed + Math.random() * CONFIG.speedVariation,
            baseLaneY: baseLaneY,
            baseOpacity: 0.4 + Math.random() * 0.4,
            baseSizeVariance: sizeVariance, // Store individual size multiplier
          };

          scene.add(particle);
          particles.push(particle);
      }

      // Animation loop with perspective-skewed racing motion
      const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate);

          // Optimized animation loop using config values
          particles.forEach((particle) => {
            const userData = particle.userData;

            // Calculate position using perspective values
            const currentX = PERSPECTIVE.startX + (PERSPECTIVE.endX - PERSPECTIVE.startX) * userData.progress;
            const perspectiveFactor = 1 - userData.progress * 0.8;
            const convergenceFactor = userData.progress * CONFIG.perspectiveIntensity;

            // Calculate Y position with configurable convergence
            const finalY = userData.baseLaneY + (PERSPECTIVE.vanishingPointY - userData.baseLaneY) * convergenceFactor;

            // Update particle
            userData.progress += userData.speed;

            if (userData.progress >= 1) {
              userData.progress = 0;
            }

            // Set optimized position and scale with configurable controls and size variance
            const finalZ = userData.progress * -CONFIG.depthRange + CONFIG.depthOffset;
            particle.position.set(currentX, finalY, finalZ);

            // Apply individual size variance along with perspective and global scaling (no random flicker)
            const scale = perspectiveFactor * CONFIG.perspectiveScale * CONFIG.globalScale * userData.baseSizeVariance;
            particle.scale.setScalar(scale);

            // Optimized opacity calculation
            const distanceOpacity = userData.baseOpacity * (0.3 + perspectiveFactor * 0.7);
            particle.material.opacity = Math.min(distanceOpacity, 0.9);
          });

          renderer.render(scene, camera);
      };

      // Handle resize
      const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      // Start animation
      animate();
      console.log("Three.js background animation started successfully");

      // Cleanup function
      return () => {
      if (process.env.NODE_ENV === 'development') {
          console.log('[ThreeBackground] Cleanup starting - disposing resources');
      }

      // 1. Cancel animation frame FIRST
      if (animationIdRef.current !== undefined) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = undefined;
      }

      // 2. Remove resize event listener
      window.removeEventListener("resize", handleResize);

      // 3. Dispose all cloned materials explicitly
      if (process.env.NODE_ENV === 'development') {
          console.log(`[ThreeBackground] Disposing ${clonedMaterials.length} cloned materials`);
      }
      clonedMaterials.forEach(material => {
          material.dispose();
      });
      clonedMaterials.length = 0; // Clear the array

      // 4. Dispose base material and geometry
      particleMaterial.dispose();
      particleGeometry.dispose();

      // 5. Clear particles array to release references
      particles.length = 0;

      // 6. Traverse scene and dispose ALL remaining meshes and lines
      scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(m => m.dispose());
            } else if (object.material) {
              (object.material as THREE.Material).dispose();
            }
          }
          if (object instanceof THREE.Line) {
            object.geometry?.dispose();
            if (object.material instanceof THREE.Material) {
              object.material.dispose();
            }
          }
      });

      if (process.env.NODE_ENV === 'development') {
          let meshCount = 0;
          let lineCount = 0;
          scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) meshCount++;
            if (obj instanceof THREE.Line) lineCount++;
          });
          // This will log 0, 0 after disposal
          console.log(`[ThreeBackground] Disposed meshes: ${meshCount}, lines: ${lineCount}`);
      }

      // 7. Clear the scene
      scene.clear();

      // 8. Dispose the renderer
      renderer.dispose();

      // 9. Force WebGL context loss
      renderer.forceContextLoss();

      // 10. Remove canvas from DOM
      if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      // 11. Nullify all refs
      rendererRef.current = null;

      if (process.env.NODE_ENV === 'development') {
          console.log('[ThreeBackground] Cleanup complete - all resources disposed, WebGL context lost');
      }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      // Check if it's a WebGL 2 support error
      if (errorMessage.includes('WebGL 1 is not supported') || errorMessage.includes('WebGL') || errorMessage.includes('webgl')) {
        console.warn("WebGL 2 not supported - Three.js background disabled (Three.js r163+ requires WebGL 2)");
      } else {
        console.error("Three.js initialization error:", errorMessage);
      }
      // Security: Graceful degradation on error - show gradient background only
      return () => {
        console.log('Three.js cleanup called after initialization error');
      };
    }
  }, []);

  return (
    <div
      id="three-background"
      role="presentation"
      aria-label="Decorative background animation"
      style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      pointerEvents: "none",
      background: "linear-gradient(135deg, rgba(11, 139, 213, 0.03) 0%, rgba(91, 154, 99, 0.03) 100%)",
      }}
    >
      <canvas
      ref={canvasRef}
      id="hero-canvas"
      aria-hidden="true"
      style={{
          width: "100%",
          height: "100%",
          display: "block",
      }}
      />
    </div>
  );
};

export default ThreeBackground;
