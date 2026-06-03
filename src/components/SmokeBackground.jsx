import { useEffect, useRef } from "react";

const fragmentShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;

#define R resolution
#define T time
#define FC gl_FragCoord.xy

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<7;i++){v+=a*noise(p);p=m*p;a*=.5;}
  return v;
}

void main(){
  vec2 uv=FC/R;
  float t=T*0.07;

  // Double-warp fbm for maximum turbulence
  vec2 p=uv*3.;
  vec2 q=vec2(fbm(p+vec2(0.,0.)+t),
              fbm(p+vec2(5.2,1.3)+t*0.8));
  vec2 r=vec2(fbm(p+4.*q+vec2(1.7,9.2)+t*1.1),
              fbm(p+4.*q+vec2(8.3,2.8)+t*0.9));
  float f=fbm(p+4.*r+t*0.6);

  // Color gradient: top=blue, mid=purple, bottom=red
  // f drives position along gradient + vertical bias
  float gradPos=clamp(uv.y*0.7+f*0.5-0.15,0.,1.);

  vec3 blue  =vec3(0.04,0.12,0.82);
  vec3 purple=vec3(0.38,0.03,0.72);
  vec3 red   =vec3(0.78,0.01,0.08);

  vec3 col;
  if(gradPos<0.5) col=mix(blue,purple,gradPos*2.);
  else            col=mix(purple,red,(gradPos-0.5)*2.);

  // Brightness variation from noise
  float bright=0.55+0.45*f;
  col*=bright;

  // Vignette
  vec2 vig=uv*2.-1.;
  col*=1.-0.5*dot(vig*vec2(0.8,1.),vig*vec2(0.8,1.));

  // Fade in
  col*=clamp(T*0.2,0.,1.);

  O=vec4(clamp(col,0.,1.),1.);
}`;

const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

export default function SmokeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertexSrc));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "resolution");
    const uTime = gl.getUniformLocation(prog, "time");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf, start;
    const loop = (now) => {
      if (!start) start = now;
      const t = (now - start) * 1e-3;
      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position:"fixed", top:0, left:0,
      width:"100%", height:"100%",
      zIndex:0, pointerEvents:"none", display:"block"
    }}/>
  );
}