"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Variant = "square" | "circle" | "triangle" | "diamond";

type PixelBlastProps = {
  variant?: Variant;
  pixelSize?: number;
  color?: string;
  patternScale?: number;
  patternDensity?: number;
  rippleSpeed?: number;
  edgeFade?: number;
  speed?: number;
};

const shapeMap: Record<Variant, number> = {
  square: 0,
  circle: 1,
  triangle: 2,
  diamond: 3,
};

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}`;

const fragmentShader = `
precision highp float;
uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uRippleSpeed;
uniform float uEdgeFade;
uniform int uShapeType;
uniform vec2 uClickPos[10];
uniform float uClickTimes[10];
out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

float hash11(float n) {
  return fract(sin(n) * 43758.5453);
}

float vnoise(vec3 p) {
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip, vec3(1.0, 57.0, 113.0)));
  float n100 = hash11(dot(ip + vec3(1.0, 0.0, 0.0), vec3(1.0, 57.0, 113.0)));
  float n010 = hash11(dot(ip + vec3(0.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0)));
  float n110 = hash11(dot(ip + vec3(1.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0)));
  float n001 = hash11(dot(ip + vec3(0.0, 0.0, 1.0), vec3(1.0, 57.0, 113.0)));
  float n101 = hash11(dot(ip + vec3(1.0, 0.0, 1.0), vec3(1.0, 57.0, 113.0)));
  float n011 = hash11(dot(ip + vec3(0.0, 1.0, 1.0), vec3(1.0, 57.0, 113.0)));
  float n111 = hash11(dot(ip + vec3(1.0, 1.0, 1.0), vec3(1.0, 57.0, 113.0)));
  vec3 w = fp * fp * fp * (fp * (fp * 6.0 - 15.0) + 10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  return mix(mix(x00, x10, w.y), mix(x01, x11, w.y), w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float time) {
  vec3 p = vec3(uv * uScale, time);
  float amplitude = 1.0;
  float frequency = 1.0;
  float sum = 1.0;
  for (int i = 0; i < 5; ++i) {
    sum += amplitude * vnoise(p * frequency);
    frequency *= 1.25;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float coverage) {
  float radius = sqrt(coverage) * 0.25;
  float distanceFromCenter = length(p - 0.5) - radius;
  float antialias = 0.5 * fwidth(distanceFromCenter);
  return coverage * (1.0 - smoothstep(-antialias, antialias, distanceFromCenter * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float coverage) {
  if (mod(id.x + id.y, 2.0) > 0.5) p.x = 1.0 - p.x;
  float distanceFromEdge = p.y - sqrt(coverage) * (1.0 - p.x);
  float antialias = fwidth(distanceFromEdge);
  return coverage * clamp(0.5 - distanceFromEdge / antialias, 0.0, 1.0);
}

float maskDiamond(vec2 p, float coverage) {
  float radius = sqrt(coverage) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), radius);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy - uResolution * 0.5;
  float aspectRatio = uResolution.x / uResolution.y;
  vec2 pixelId = floor(fragCoord / uPixelSize);
  vec2 pixelUV = fract(fragCoord / uPixelSize);
  float cellPixelSize = 8.0 * uPixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);
  float base = fbm2(uv, uTime * 0.05) * 0.5 - 0.65;
  float feed = base + (uDensity - 0.5) * 0.3;

  for (int i = 0; i < 10; ++i) {
    vec2 position = uClickPos[i];
    if (position.x < 0.0) continue;
    vec2 clickUV = ((position - uResolution * 0.5 - cellPixelSize * 0.5) / uResolution) * vec2(aspectRatio, 1.0);
    float elapsed = max(uTime - uClickTimes[i], 0.0);
    float distanceFromClick = distance(uv, clickUV);
    float ring = exp(-pow((distanceFromClick - uRippleSpeed * elapsed) / 0.1, 2.0));
    float attenuation = exp(-elapsed) * exp(-10.0 * distanceFromClick);
    feed = max(feed, ring * attenuation);
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float isOn = step(0.5, feed + bayer);
  float coverage = isOn;
  float mask = coverage;
  if (uShapeType == 1) mask = maskCircle(pixelUV, coverage);
  else if (uShapeType == 2) mask = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == 3) mask = maskDiamond(pixelUV, coverage);

  if (uEdgeFade > 0.0) {
    vec2 normalizedPosition = gl_FragCoord.xy / uResolution;
    float edge = min(min(normalizedPosition.x, normalizedPosition.y), min(1.0 - normalizedPosition.x, 1.0 - normalizedPosition.y));
    mask *= smoothstep(0.0, uEdgeFade, edge);
  }

  vec3 srgbColor = mix(uColor * 12.92, 1.055 * pow(uColor, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, uColor));
  fragColor = vec4(srgbColor, mask);
}`;

export default function PixelBlast({
  variant = "square",
  pixelSize = 3,
  color = "#ff8a3d",
  patternScale = 2,
  patternDensity = 1,
  rippleSpeed = 0.3,
  edgeFade = 0.5,
  speed = 0.5,
}: PixelBlastProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearAlpha(0);
    container.appendChild(renderer.domElement);

    const uniforms = {
      uResolution: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uClickPos: { value: Array.from({ length: 10 }, () => new THREE.Vector2(-1, -1)) },
      uClickTimes: { value: new Float32Array(10) },
      uShapeType: { value: shapeMap[variant] },
      uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
      uScale: { value: patternScale },
      uDensity: { value: patternDensity },
      uRippleSpeed: { value: rippleSpeed },
      uEdgeFade: { value: edgeFade },
    };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      glslVersion: THREE.GLSL3,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));
    const clock = new THREE.Clock();
    let visible = true;
    let clickIndex = 0;
    let animationFrame = 0;
    const timeOffset = Math.random() * 1000;

    const setSize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
      uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
    };
    setSize();

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(container);

    const onPointerDown = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const scaleX = renderer.domElement.width / rect.width;
      const scaleY = renderer.domElement.height / rect.height;
      uniforms.uClickPos.value[clickIndex].set(
        (event.clientX - rect.left) * scaleX,
        (rect.height - (event.clientY - rect.top)) * scaleY,
      );
      uniforms.uClickTimes.value[clickIndex] = uniforms.uTime.value;
      clickIndex = (clickIndex + 1) % uniforms.uClickPos.value.length;
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown, { passive: true });

    const animate = () => {
      if (visible) {
        uniforms.uShapeType.value = shapeMap[variant];
        uniforms.uColor.value.set(color);
        uniforms.uScale.value = patternScale;
        uniforms.uDensity.value = patternDensity;
        uniforms.uRippleSpeed.value = rippleSpeed;
        uniforms.uEdgeFade.value = edgeFade;
        uniforms.uTime.value = timeOffset + clock.getElapsedTime() * speed;
        renderer.render(scene, camera);
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      cancelAnimationFrame(animationFrame);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color, edgeFade, patternDensity, patternScale, pixelSize, rippleSpeed, speed, variant]);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden" aria-hidden="true" />;
}
